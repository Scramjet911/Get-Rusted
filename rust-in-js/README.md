### First wasm with rust and js
Run server using `python -m http.server` to see the js alert

### Calculator and game of life
- Install dependencies: `cargo install` and `npm i` in respective folders.
- Build rust to wasm using `wasm-pack build --target web` then run react server using `npm start`.

### Linking rust package with react app
When starting a new app you need to link the rust package with the react (webpack) app for live updates. 
You can do this (after building the rust package) using `npm link ../pkg --save`. This adds a symlink to the package in the `node_modules`.
See [docs here](https://docs.npmjs.com/cli/v10/commands/npm-link)

#### Disclaimer
- This is a Rust learning series so the web code is not clean...
