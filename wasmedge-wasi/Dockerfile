# syntax=docker/dockerfile:1

FROM --platform=$BUILDPLATFORM rust:1.77 AS buildbase
WORKDIR /src
RUN <<EOT bash
    set -ex
    apt-get update
    apt-get install -y \
        git \
        clang
    rustup target add wasm32-wasi
EOT

FROM buildbase AS build
COPY Cargo.toml .
COPY src ./src 
# Build the Wasm binary
RUN cargo build --target wasm32-wasi --release

FROM --platform=$BUILDPLATFORM ubuntu

SHELL ["/bin/bash", "-c"]
COPY --link --from=build /src/target/wasm32-wasi/release/wasmedge_hyper_server_tflite.wasm /server.wasm
RUN apt-get update && \
    apt-get install -y \
    curl git python3
RUN curl -sSf https://raw.githubusercontent.com/WasmEdge/WasmEdge/master/utils/install.sh | bash -s -- --plugins wasi_nn-tensorflowlite

CMD ["bash", "-c", "/root/.wasmedge/bin/wasmedge server.wasm"]
