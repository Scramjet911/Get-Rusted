use burn_import::onnx::ModelGen;

fn main() {
    ModelGen::new()
        .input("src/model/mnist-12.onnx")
        .out_dir("model/")
        .run_from_script();
}
