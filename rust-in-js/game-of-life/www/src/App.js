import "./App.css";
import { Universe } from "game-of-life";
import { useEffect, useRef } from "react";

function App() {
  const universeRef = useRef(Universe.new());
  const universeCanvas = useRef();
  const timeoutRef = useRef();

  const renderLoop = () => {
    universeCanvas.current.textContent = universeRef.current.render();
    universeRef.current.step();

    // console.log("rendering");
    if (!timeoutRef.current) {
      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null;
        requestAnimationFrame(renderLoop);
      }, 500);
    }
  };
  useEffect(() => {
    requestAnimationFrame(renderLoop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <pre style={{ lineHeight: 0.8 }} ref={universeCanvas} />
    </div>
  );
}

export default App;
