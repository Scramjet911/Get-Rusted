use image::io::Reader;
use image::DynamicImage;
use std::io::Cursor;
use std::result::Result;
use wasi_nn::{ExecutionTarget, GraphBuilder, GraphEncoding, TensorType};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn classify_image(data: Vec<u8>) -> Result<String, JsError> {
    // let buf = image::load_from_memory_with_format(&data, image::ImageFormat::Jpeg);
    let model_data: &[u8] =
        include_bytes!("../models/mobilenet_v1_1.0_224/mobilenet_v1_1.0_224_quant.tflite");
    let labels = include_str!("../models/mobilenet_v1_1.0_224/labels_mobilenet_quant_v1_224.txt");
    let graph = GraphBuilder::new(GraphEncoding::TensorflowLite, ExecutionTarget::CPU)
        .build_from_bytes(&[model_data])?;
    let mut ctx = graph.init_execution_context()?;

    let tensor_data = image_to_tensor(&data, 224, 224);
    ctx.set_input(0, TensorType::U8, &[1, 224, 224, 3], &tensor_data)?;

    // Execute the inference.
    ctx.compute()?;

    let mut output_buffer = vec![0u8; labels.lines().count()];
    _ = ctx.get_output(0, &mut output_buffer)?;

    // Sort the result with the highest probability result first
    let results = sort_results(&output_buffer);
    /*
    for r in results.iter() {
        println!("results: {} {}", r.0, r.1);
    }
    */
    // The first result's first element points to the labels position
    let class_name = labels.lines().nth(results[0].0).unwrap_or("Unknown");
    println!("result: {} {}", class_name, results[0].1);

    Ok(format!(
        "{} is detected with {}/255 confidence",
        class_name, results[0].1
    ))
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
fn image_to_tensor(raw_data: &[u8], height: u32, width: u32) -> Vec<u8> {
    let reader = Reader::new(Cursor::new(raw_data))
        .with_guessed_format()
        .expect("Cursor io never fails");
    let pixels = reader.decode().unwrap();
    let dyn_img: DynamicImage = pixels.resize_exact(width, height, image::imageops::Triangle);
    let bgr_img = dyn_img.to_rgb8();
    // Get an array of the pixel values
    let raw_u8_arr: &[u8] = &bgr_img.as_raw()[..];
    return raw_u8_arr.to_vec();
}

// A wrapper for class ID and match probabilities.
#[derive(Debug, PartialEq)]
struct InferenceResult(usize, u8);
