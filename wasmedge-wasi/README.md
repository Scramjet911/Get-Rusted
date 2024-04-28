# TFLite server example

Copied from [here](https://github.com/WasmEdge/wasmedge_hyper_demo/tree/main/server-tflite)

## Without Docker

### Prequsites

In order to run this example, you will first install WasmEdge with Tensorflow Lite plugin:

```
VERSION=0.13.1
curl -sSf https://raw.githubusercontent.com/WasmEdge/WasmEdge/master/utils/install.sh | bash -s -- -v $VERSION --plugins wasi_nn-tensorflowlite
```

Then, install Tensorflow Lite dependency libraries:

```
VERSION=TF-2.12.0-CC
curl -s -L -O --remote-name-all https://github.com/second-state/WasmEdge-tensorflow-deps/releases/download/$VERSION/WasmEdge-tensorflow-deps-TFLite-$VERSION-manylinux2014_x86_64.tar.gz
tar -zxf WasmEdge-tensorflow-deps-TFLite-$VERSION-manylinux2014_x86_64.tar.gz
rm -f WasmEdge-tensorflow-deps-TFLite-$VERSION-manylinux2014_x86_64.tar.gz

mv libtensorflowlite_c.so ~/.wasmedge/lib
mv libtensorflowlite_flex.so ~/.wasmedge/lib
```

### Build

```
cargo build --target wasm32-wasi --release
```

### Run

```
wasmedge target/wasm32-wasi/release/wasmedge_hyper_server_tflite.wasm
```

### Test

Run the following from another terminal.

```
$ curl http://localhost:8080/classify -X POST --data-binary "@grace_hopper.jpg"
military uniform is detected with 206/255 confidence
```

## With Docker

### Build
```
docker buildx build --platform wasm -t wasmedge_tflite .
```

### Run
```
docker run -p 3001:8080 --platform=wasm wasmedge_tflite
```

### Test

```
$ curl http://localhost:3001/classify -X POST --data-binary "@grace_hopper.jpg"
military uniform is detected with 206/255 confidence
```
It "should" work if docker doesn't mess up the platform build. Platform was `wasi/wasm` earlier but it broke in a build so now tried `wasm` found from [this](https://github.com/deislabs/containerd-wasm-shims/issues/87) github issue and it works...🔥🔥

#### TODO
- Make docker slim image