#!/bin/zsh

rm -rf ../jniLibs
mkdir -p ../jniLibs/arm64-v8a
mkdir ../jniLibs/armeabi-v7a
mkdir ../jniLibs/x86

cp ./target/aarch64-linux-android/release/libcalculator.so ../jniLibs/arm64-v8a/libcalculator.so
cp ./target/armv7-linux-androideabi/release/libcalculator.so ../jniLibs/armeabi-v7a/libcalculator.so
cp ./target/i686-linux-android/release/libcalculator.so ../jniLibs/x86/libcalculator.so
