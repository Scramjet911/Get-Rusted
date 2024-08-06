#![cfg(target_os = "android")]
#![allow(non_snake_case)]

use jni::objects::JObject;
use jni::sys::jdouble;
use jni::JNIEnv;

#[no_mangle]
pub unsafe extern "C" fn Java_com_example_calc_HandleOperationKt_add(
    env: JNIEnv,
    _: JObject,
    j_num1: jdouble,
    j_num2: jdouble,
) -> jdouble {
    j_num1 + j_num2
}

#[no_mangle]
pub unsafe extern "C" fn Java_com_example_calc_HandleOperationKt_sub(
    env: JNIEnv,
    _: JObject,
    j_num1: jdouble,
    j_num2: jdouble,
) -> jdouble {
    j_num1 - j_num2
}

#[no_mangle]
pub unsafe extern "C" fn Java_com_example_calc_HandleOperationKt_div(
    env: JNIEnv,
    _: JObject,
    j_num1: jdouble,
    j_num2: jdouble,
) -> jdouble {
    j_num1 / j_num2
}

#[no_mangle]
pub unsafe extern "C" fn Java_com_example_calc_HandleOperationKt_mul(
    env: JNIEnv,
    _: JObject,
    j_num1: jdouble,
    j_num2: jdouble,
) -> jdouble {
    j_num1 * j_num2
}
