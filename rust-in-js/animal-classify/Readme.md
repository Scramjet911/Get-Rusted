Did a mistake in this one. I found wasi-nn online and thought I could integrate it into the web.  
Turns out as of now, wasm-bindgen does not have support for wasm32-wasi target. Only wasm32-uknown-uknown targets.  
So going to compare it with using tflite wasm in the backend.