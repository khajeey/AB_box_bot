import React, { useState } from "react";

function App() {
  const [unit, setUnit] = useState("m");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState("");

  const calculate = () => {
    let l = parseFloat(length);
    let w = parseFloat(width);
    let h = parseFloat(height);

    if (unit === "mm") {
      l /= 1000; w /= 1000; h /= 1000;
    } else if (unit === "cm") {
      l /= 100; w /= 100; h /= 100;
    }

    const volume = l * w * h; // m³
    const liters = volume * 1000;

    setResult(`Hajm: ${volume.toFixed(3)} m³\nSig‘im: ${liters.toFixed(2)} litr`);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>O‘lchov birligini tanlang</h2>
      <select value={unit} onChange={(e) => setUnit(e.target.value)}>
        <option value="mm">mm</option>
        <option value="cm">cm</option>
        <option value="m">m</option>
      </select>

      <h2>Uzunliklarni kiriting</h2>
      <input type="number" placeholder="Uzunlik" value={length} onChange={(e) => setLength(e.target.value)} />
      <input type="number" placeholder="Kenglik" value={width} onChange={(e) => setWidth(e.target.value)} />
      <input type="number" placeholder="Balandlik" value={height} onChange={(e) => setHeight(e.target.value)} />

      <button onClick={calculate}>Hisoblash</button>

      <pre>{result}</pre>
    </div>
  );
}

export default App;
