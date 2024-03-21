use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn add(num1: usize, num2: usize) -> usize {
    num1 + num2
}

#[wasm_bindgen]
pub fn sub(num1: usize, num2: usize) -> usize {
    num1 - num2
}

#[wasm_bindgen]
pub fn div(num1: usize, num2: usize) -> usize {
    num1 / num2
}

#[wasm_bindgen]
pub fn mul(num1: usize, num2: usize) -> usize {
    num1 * num2
}
