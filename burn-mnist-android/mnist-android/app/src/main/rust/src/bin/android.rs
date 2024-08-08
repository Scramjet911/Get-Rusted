#![allow(clippy::new_without_default)]
#![allow(non_snake_case)]

// use crate::state::{build_and_load_model, Backend};
use crate::mnist::Model;

// use jni::objects::JObject;
// use jni::sys::jdouble;
use jni::JNIEnv;

use burn::{backend::ndarray::NdArray, tensor::Tensor};

type Backend = NdArray<f32>;
static mut MODEL: Option<Model<Backend>> = None;

#[no_mangle]
pub unsafe extern "C" fn Java_com_example_mnist_init(env: JNIEnv) {
    MODEL = None;
}

#[no_mangle]
pub async unsafe extern "C" fn Java_com_example_mnist_infer(env: JNIEnv<'_>) {
    let input: &[f32] = &[];
    let device = <Backend as burn::tensor::backend::Backend>::Device::default();

    if MODEL.is_none() {
        // Create a new model and load the state
        MODEL = Model::default();
    }

    let model = MODEL.as_ref().unwrap();

    let device = Default::default();
    // Reshape from the 1D array to 3d tensor [batch, height, width]
    let input: Tensor<Backend, 3> = Tensor::from_floats(input, &device).reshape([1, 28, 28]);

    // Normalize input: make between [0,1] and make the mean=0 and std=1
    // values mean=0.1307,std=0.3081 were copied from Pytorch Mist Example
    // https://github.com/pytorch/examples/blob/54f4572509891883a947411fd7239237dd2a39c3/mnist/main.py#L122

    let input = ((input / 255) - 0.1307) / 0.3081;

    // Run the tensor input through the model
    let output: Tensor<Backend, 2> = model.forward(input);

    // Convert the model output into probability distribution using softmax formula
    let output = burn::tensor::activation::softmax(output, 1);

    // Flatten output tensor with [1, 10] shape into boxed slice of [f32]
    // #[cfg(not(target_family = "android"))]
    let output = output.into_data().convert::<f32>().value;

    // #[cfg(target_family = "android")]
    let output = output.into_data().await.convert::<f32>().value;

    Ok(array)
}
