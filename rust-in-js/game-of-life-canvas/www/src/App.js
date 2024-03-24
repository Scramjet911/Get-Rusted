import "./App.css";
import { Universe, Cell } from "game-of-life";
import { useEffect, useRef } from "react";
import { GOLWasm } from "./wasmInit";

const CELL_SIZE = 5;
const GRID_COLOR = "#CCCCCC";
const DEAD_COLOR = "#FFFFFF";
const ALIVE_COLOR = "#000000";

function App() {
  const universeRef = useRef(Universe.new());
  const universeCanvas = useRef();
  const ctx = useRef();
  const timeoutRef = useRef();
  const widthRef = useRef();
  const heightRef = useRef();

  const setupCanvas = (width, height) => {
    universeCanvas.current.height = (CELL_SIZE + 1) * height + 1;
    universeCanvas.current.width = (CELL_SIZE + 1) * width + 1;

    ctx.current = universeCanvas.current.getContext("2d");
  };

  const drawGrid = () => {
    ctx.current.beginPath();
    ctx.current.strokeStyle = GRID_COLOR;

    // Vertical lines.
    for (let i = 0; i <= widthRef.current; i++) {
      ctx.current.moveTo(i * (CELL_SIZE + 1) + 1, 0);
      ctx.current.lineTo(
        i * (CELL_SIZE + 1) + 1,
        (CELL_SIZE + 1) * heightRef.current + 1
      );
    }

    // Horizontal lines.
    for (let j = 0; j <= heightRef.current; j++) {
      ctx.current.moveTo(0, j * (CELL_SIZE + 1) + 1);
      ctx.current.lineTo(
        (CELL_SIZE + 1) * widthRef.current + 1,
        j * (CELL_SIZE + 1) + 1
      );
    }

    ctx.current.stroke();
  };

  const getIndex = (row, column) => {
    return row * widthRef.current + column;
  };

  const drawCells = () => {
    const cellsPtr = universeRef.current.cells();
    const cells = new Uint8Array(
      GOLWasm.memory.buffer,
      cellsPtr,
      widthRef.current * heightRef.current
    );
    ctx.current.beginPath();
    for (let row = 0; row < heightRef.current; row++) {
      for (let col = 0; col < widthRef.current; col++) {
        const idx = getIndex(row, col);

        ctx.current.fillStyle =
          cells[idx] === Cell.Dead ? DEAD_COLOR : ALIVE_COLOR;

        ctx.current.fillRect(
          col * (CELL_SIZE + 1) + 1,
          row * (CELL_SIZE + 1) + 1,
          CELL_SIZE,
          CELL_SIZE
        );
      }
    }

    ctx.current.stroke();
  };

  const renderLoop = () => {
    universeRef.current.step();
    drawGrid();
    drawCells();
    if (!timeoutRef.current) {
      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null;
        requestAnimationFrame(renderLoop);
      }, 500);
    }
  };

  useEffect(() => {
    widthRef.current = universeRef.current.width();
    heightRef.current = universeRef.current.height();
    setupCanvas(universeRef.current.width(), universeRef.current.height());
    requestAnimationFrame(renderLoop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <canvas ref={universeCanvas} />
    </div>
  );
}

export default App;
