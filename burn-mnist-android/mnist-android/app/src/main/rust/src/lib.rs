#![allow(clippy::new_without_default)]
#![allow(non_snake_case)]
#[macro_use]
extern crate log;
extern crate android_logger;

use android_logger::Config;
use log::LevelFilter;

pub mod model;

pub use model::mnist;

use jni::{
    objects::JByteArray,
    sys::{jint, jobject},
    JNIEnv,
};

use burn::{
    backend::ndarray::NdArray,
    module::Module,
    record::{DefaultFileRecorder, FullPrecisionSettings, NamedMpkFileRecorder},
    tensor::Tensor,
};

use crate::mnist::Model;

#[no_mangle]
pub unsafe extern "C" fn Java_com_example_calc_HomeKt_infer(
    env: JNIEnv,
    _: jobject,
    inputImage: JByteArray,
    imageWidth: jint,
    imageHeight: jint,
) -> i64 {
    android_logger::init_once(Config::default().with_max_level(LevelFilter::Trace));

    let input = env
        .convert_byte_array(&inputImage)
        .expect("some error")
        .iter()
        .map(|x| *x as f32)
        .collect::<Vec<f32>>();

    debug!("Func input {:?}", input);

    type Backend = NdArray<f32>;
    let device = <Backend as burn::tensor::backend::Backend>::Device::default();
    // debug!("got values2 {}", 23);

    let model: Model<Backend> = Model::default();
    // Reshape from the 1D array to 3d tensor [batch, height, width]
    // debug!("got values2.5 {}", input.len());

    debug!("input image tensor {:?}", input);
    let input: Tensor<Backend, 4> =
        Tensor::from_floats(input.as_slice(), &device).reshape([1, 1, 28, 28]);

    // Normalize input: make between [0,1] and make the mean=0 and std=1
    // values mean=0.1307,std=0.3081 were copied from Pytorch Mist Example
    // https://github.com/pytorch/examples/blob/54f4572509891883a947411fd7239237dd2a39c3/mnist/main.py#L122

    let input = ((input / 255) - 0.1307) / 0.3081;
    let filerecorder: NamedMpkFileRecorder<FullPrecisionSettings> = DefaultFileRecorder::new();
    debug!(
        "Input Norm {:?}",
        input.clone().save_file("./somedata.txt", &filerecorder)
    );

    // Run the tensor input through the model
    let output: Tensor<Backend, 2> = model.forward(input);

    // Convert the model output into probability distribution using softmax formula
    // let output = burn::tensor::activation::softmax(output, 1);
    debug!("Result {:?}", output);

    let res = output.argmax(1).into_scalar();
    debug!("Result {}", res);
    res
    // 23
}
