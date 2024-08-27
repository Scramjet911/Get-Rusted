#!/bin/zsh

cargo build --target aarch64-linux-android --release
cargo build --target armv7-linux-androideabi --release
cargo build --target i686-linux-android --release
cargo build --target x86_64-linux-android --release

rm -rf ../jniLibs
mkdir -p ../jniLibs/arm64-v8a
mkdir ../jniLibs/armeabi-v7a
mkdir ../jniLibs/x86
mkdir ../jniLibs/x86_64

cp ./target/aarch64-linux-android/release/libmnist_custom.so ../jniLibs/arm64-v8a/libmnist_custom.so
cp ./target/armv7-linux-androideabi/release/libmnist_custom.so ../jniLibs/armeabi-v7a/libmnist_custom.so
cp ./target/i686-linux-android/release/libmnist_custom.so ../jniLibs/x86/libmnist_custom.so
cp ./target/x86_64-linux-android/release/libmnist_custom.so ../jniLibs/x86_64/libmnist_custom.so
