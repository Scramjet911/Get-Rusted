use hyper::service::{make_service_fn, service_fn};
use hyper::{Body, Method, Request, Response, Server, StatusCode};
use image::io::Reader;
use image::DynamicImage;
use image2tensor::convert_image_bytes_to_tensor_bytes;
use std::convert::Infallible;
use std::io::Cursor;
use std::net::SocketAddr;
use std::result::Result;
use wasi_nn::{ExecutionTarget, GraphBuilder, GraphEncoding, TensorType};

// fn print_type_of<T>(_: &T) {
//     println!("{}", std::any::type_name::<T>())
// }
/// This is our service handler. It receives a Request, routes on its
/// path, and returns a Future of a Response.
async fn classify(req: Request<Body>) -> Result<Response<Body>, anyhow::Error> {
    let model_data: &[u8] =
        include_bytes!("models/mobilenet_v1_1.0_224/mobilenet_v1_1.0_224_quant.tflite");
    let labels = include_str!("models/mobilenet_v1_1.0_224/labels_mobilenet_quant_v1_224.txt");
    let graph = GraphBuilder::new(GraphEncoding::TensorflowLite, ExecutionTarget::CPU)
        .build_from_bytes(&[model_data])?;
    let mut ctx = graph.init_execution_context()?;

    match (req.method(), req.uri().path()) {
        // Serve some instructions at /
        (&Method::GET, "/") => Ok(Response::new(Body::from(
            "Try POSTing data to /classify such as: `curl http://localhost:3000/classify -X POST --data-binary '@grace_hopper.jpg'`",
        ))),

        (&Method::POST, "/classify") => {
            let buf = hyper::body::to_bytes(req.into_body()).await?;
            let tensor_data = convert_image_bytes_to_tensor_bytes(&buf, 224, 224, image2tensor::TensorType::U8, image2tensor::ColorOrder::RGB).expect("Some error");
            ctx.set_input(0, TensorType::F64, &[1, 224, 224, 3], &tensor_data)?;
            print!("Request received");

            // Execute the inference.
            ctx.compute()?;
            
            // Retrieve the output.
            let mut output_buffer = vec![0u8; labels.lines().count()];
            _ = ctx.get_output(0, &mut output_buffer)?;
            
            // Sort the result with the highest probability result first
            let results = sort_results(&output_buffer);
            
            // The first result's first element points to the labels position
            let class_name = labels.lines().nth(results[0].0).unwrap_or("Unknown");
            println!("result: {} {}", class_name, results[0].1);

            Ok(Response::new(Body::from(format!("{} is detected with {}/255 confidence", class_name, results[0].1))))
        }

        // Return the 404 Not Found for other routes.
        _ => {
            let mut not_found = Response::default();
            *not_found.status_mut() = StatusCode::NOT_FOUND;
            Ok(not_found)
        }
    }
}

#[tokio::main(flavor = "current_thread")]
async fn main() -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
    let addr = SocketAddr::from(([0, 0, 0, 0], 8080));
    let make_svc =
        make_service_fn(
            |_| async move { Ok::<_, Infallible>(service_fn(move |req| classify(req))) },
        );
    let server = Server::bind(&addr).serve(make_svc);
    if let Err(e) = server.await {
        eprintln!("server error: {}", e);
    }
    Ok(())

}

// Sort the buffer of probabilities. The graph places the match probability for each class at the
// index for that class (e.g. the probability of class 42 is placed at buffer[42]). Here we convert
// to a wrapping InferenceResult and sort the results.
fn sort_results(buffer: &[u8]) -> Vec<InferenceResult> {
    let mut results: Vec<InferenceResult> = buffer
        .iter()
        .enumerate()
        .map(|(c, p)| InferenceResult(c, *p))
        .collect();
    results.sort_by(|a, b| b.1.partial_cmp(&a.1).unwrap());
    results
}

// Take the image data, resize it to height x width, and then convert
// the pixel precision to FP32. The resulting BGR pixel vector is then returned.
// fn image_to_tensor(raw_data: &[u8], height: u32, width: u32) -> Vec<u8> {
//     let reader = Reader::new(Cursor::new(raw_data))
//         .with_guessed_format()
//         .expect("Cursor io never fails");
//     let pixels = reader.decode().unwrap();
//     let dyn_img: DynamicImage = pixels.resize_exact(width, height, image::imageops::Triangle);
//     let bgr_img = dyn_img.to_rgb8();
//     // Get an array of the pixel values
//     let raw_u8_arr: &[u8] = &bgr_img.as_raw()[..];
//     return raw_u8_arr.to_vec();
// }

// A wrapper for class ID and match probabilities.
#[derive(Debug, PartialEq)]
struct InferenceResult(usize, u8);
