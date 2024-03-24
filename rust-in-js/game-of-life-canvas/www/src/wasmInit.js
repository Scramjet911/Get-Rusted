import initPkg from "game-of-life";

let GOLWasm = null;

const initWasm = async () => {
  GOLWasm = await initPkg();
};

export { GOLWasm };
export default initWasm;
