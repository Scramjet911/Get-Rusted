import React, { useState } from "react";
import "./App.css";

import { add, sub, mul, div } from "calculator";

const App = () => {
  const [result, setResult] = useState("");
  const [input, setInput] = useState("");
  const [operator, setOperator] = useState(null);
  const [prevValue, setPrevValue] = useState(null);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleOperator = (op) => {
    if (input !== "") {
      setOperator(op);
      setPrevValue(parseFloat(input));
      setInput("");
    }
  };

  const calculateResult = async () => {
    if (input !== "" && prevValue !== null) {
      const currentValue = parseFloat(input);
      let newResult;
      switch (operator) {
        case "+":
          newResult = add(prevValue, currentValue);
          break;
        case "-":
          newResult = sub(prevValue, currentValue);
          break;
        case "*":
          newResult = mul(prevValue, currentValue);
          break;
        case "/":
          newResult = div(prevValue, currentValue);
          break;
        default:
          newResult = result;
      }
      setResult(newResult.toString());
      setInput("");
      setPrevValue(null);
      setOperator(null);
    }
  };

  const clearCalculator = () => {
    setResult("");
    setInput("");
    setOperator(null);
    setPrevValue(null);
  };

  return (
    <div className="calculator">
      <input
        type="text"
        value={input || result}
        onChange={handleInput}
        placeholder="Enter number"
      />
      <div className="buttons">
        <button onClick={() => handleOperator("+")}>+</button>
        <button onClick={() => handleOperator("-")}>-</button>
        <button onClick={() => handleOperator("*")}>*</button>
        <button onClick={() => handleOperator("/")}>/</button>
        <button onClick={calculateResult}>=</button>
        <button onClick={clearCalculator}>C</button>
      </div>
    </div>
  );
};

export default App;
