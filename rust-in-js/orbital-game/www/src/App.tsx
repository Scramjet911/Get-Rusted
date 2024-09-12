import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mqScriptRef = useRef<HTMLScriptElement | null>(null);
  const loadScriptRef = useRef<HTMLScriptElement | null>(null);

  const [isGameActive, setIsGameActive] = useState(false);

  const loadGame = () => {
    setIsGameActive(true);

    const MQ_SCRIPT_ID = "miniquad-bundle-script";
    const mqScriptEl = document.getElementById(MQ_SCRIPT_ID);
    if (!mqScriptEl) {
      const miniquadScript = document.createElement("script");
      const loadScript = document.createElement("script");

      miniquadScript.id = MQ_SCRIPT_ID;

      loadScript.innerHTML = 'load("./orbital-strike.wasm")';
      loadScript.id = "orbital-game-load-script";

      miniquadScript.src = "/mq_js_bundle2.js";
      miniquadScript.async = true;
      miniquadScript.onload = () => {
        loadScriptRef.current = document.body.appendChild(loadScript);
      };

      mqScriptRef.current = document.body.appendChild(miniquadScript);
    } else {
      //@ts-expect-error window load
      window["load"]("./orbital-strike.wasm");
    }
    // let canvasContext = canvasRef.current?.getContext("2d");
    // if (canvasRef.current && canvasContext) {
    //   canvasContext.clip = () => {};
    // }
  };

  useEffect(() => {
    return () => {
      if (mqScriptRef.current) {
        // document.removeChild(mqScriptRef.current);
        mqScriptRef.current.remove();
        if (loadScriptRef.current) {
          loadScriptRef.current.remove();
        }
      }
      // const windowBackup = backupWindow.current;
      // if (windowBackup) {
      //   Object.keys(window).forEach((key) => {
      //     // Check if the key exists in the shallow clone
      //     if (!(key in windowBackup)) {
      //       // If the key does not exist in the shallow clone, delete it from window
      //       try {
      //         delete (window as any)[key];
      //       } catch (e) {
      //         console.log(e);
      //       }
      //     }
      //   });
      // }
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        flexDirection: "column",
        display: "flex",
      }}
    >
      {isGameActive ? (
        <canvas
          ref={canvasRef}
          id="glcanvas"
          tabIndex={1}
          width={300}
          height={300}
        />
      ) : (
        <button
          style={{ width: 300, height: 300, backgroundColor: "#BDBDBD" }}
          onClick={loadGame}
        >
          <p style={{ width: "100%", height: "100%", textAlign: "center" }}>
            Click to load game
          </p>
        </button>
      )}
      <Link style={{ marginTop: "40px" }} to="another-page">
        Another page
      </Link>
    </div>
  );
}

export default App;
