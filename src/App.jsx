import React, { useState } from "react";
import { CiCalculator1 } from "react-icons/ci";
import { FaArrowRightLong } from "react-icons/fa6";
import { LuRuler } from "react-icons/lu";
import { RiRestartLine } from "react-icons/ri";
import { WiStars } from "react-icons/wi";

function App() {
  const [unit, setUnit] = useState("m");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const calculate = () => {
    if (!length || !width || !height) {
      setError("Iltimos, barcha qiymatlarni kiriting!");
      setResult("");
      return;
    }
    setError("");

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

  const reset = () => {
    setLength("");
    setWidth("");
    setHeight("");
    setResult("");
    setError("");
  };

  return (
    <div className="bg-gray-700 m-auto border-2 border-gray-300 rounded-2xl max-w-[600px]">
      <header className="bg-[#270075] flex items-center gap-6 text-2xl p-[25px] rounded-2xl">
        <img className="w-[120px] rounded-2xl" src="/frame-16.png" alt="logo" />
        <h1 className="text-white text-3xl flex items-center gap-3">
          Ab Box Kalkulyator <span><WiStars/></span>
        </h1>
      </header>

      <main className="p-[25px]">
        <div>
          <p className="my-4 text-white text-xl flex items-center gap-3">
            <span><LuRuler/></span> O‘lchov birligi
          </p>
          <div className="flex gap-3">
            {["mm", "cm", "m"].map((u) => (
              <input
                key={u}
                type="button"
                value={u.toUpperCase()}
                onClick={() => setUnit(u)}
                className={`border-none rounded-2xl px-10 py-2 text-white cursor-pointer ease-in-out ${
                  unit === u ? "bg-[#8637E6]" : "bg-gray-500"
                } hover:bg-[#8637e683]`}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-4 my-[20px]">
          <div className="text-center text-white flex-1">
            <p className="text-xl mb-[10px]">Uzunlik</p>
            <input
              className="w-full border-2 border-amber-100 rounded-2xl py-[15px] text-center"
              placeholder="0"
              type="number"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <p>{unit}</p>
          </div>

          <div className="text-center text-white flex-1">
            <p className="text-xl mb-[10px]">Eni</p>
            <input
              className="w-full border-2 border-amber-100 rounded-2xl py-[15px] text-center"
              placeholder="0"
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
            />
            <p>{unit}</p>
          </div>

          <div className="text-center text-white flex-1">
            <p className="text-xl mb-[10px]">Balandlik</p>
            <input
              className="w-full border-2 border-amber-100 rounded-2xl py-[15px] text-center"
              placeholder="0"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
            <p>{unit}</p>
          </div>
        </div>

        {error && <p className="text-red-400 mb-2">{error}</p>}

        <div className="flex gap-5">
          <button
            onClick={calculate}
            className="text-white items-center bg-[#8637E6] py-[10px] px-[20px] flex flex-row gap-2 rounded-2xl hover:bg-[#8637e683] cursor-pointer ease-in-out"
          >
            <span><CiCalculator1 size={25} /> </span> Hisoblash <span><FaArrowRightLong /></span>
          </button>
          <button
            onClick={reset}
            className="bg-gray-400 py-3 px-4 rounded-2xl cursor-pointer ease-in-out hover:bg-gray-200"
          >
            <RiRestartLine />
          </button>
        </div>

        {result && (
          <div className="mt-4 p-4 bg-[#8637E6] text-white text-xl rounded-2xl text-center whitespace-pre-line">
            {result}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
