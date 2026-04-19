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

    if (unit === "mm") { l /= 1000; w /= 1000; h /= 1000; }
    else if (unit === "cm") { l /= 100; w /= 100; h /= 100; }

    const volume = l * w * h;
    const liters = volume * 1000;
    setResult(`Hajm: ${volume.toFixed(3)} m³\nSig‘im: ${liters.toFixed(2)} litr`);
  };

  const reset = () => {
    setLength(""); setWidth(""); setHeight(""); setResult(""); setError("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-700 border-none border-gray-300 rounded-2xl max-w-[600px] w-full shadow-lg">
        <header className="bg-[#270075] flex items-center gap-6 text-2xl p-[25px] rounded-t-2xl">
          <img className="w-[100px] rounded-2xl" src="/frame-16.png" alt="logo" />
          <h1 className="text-white text-2xl font-bold flex items-center gap-3">
            Ab Box Kalkulyator <WiStars />
          </h1>
        </header>

        <main className="p-[25px]">
          <p className="my-4 text-white text-xl flex items-center gap-3">
            <LuRuler /> O‘lchov birligi
          </p>
          <div className="flex gap-3 justify-center mb-6">
            {["mm", "cm", "m"].map((u) => (
              <button
                key={u}
                onClick={() => setUnit(u)}
                className={`px-8 py-2 rounded-2xl text-white cursor-pointer transition ${
                  unit === u ? "bg-[#8637E6]" : "bg-gray-500"
                } hover:bg-[#8637e683]`}
              >
                {u.toUpperCase()}
              </button>
            ))}
          </div>

        <div className="flex gap-4 my-6 text-white">
          <div className="text-center flex-1">
            <p className="text-lg mb-2">Uzunlik</p>
            <input
              type="number"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full border-2 border-amber-100 rounded-2xl py-3 text-center appearance-none"
              placeholder="0"
            />
            <p>{unit}</p>
          </div>

          <div className="text-center flex-1">
            <p className="text-lg mb-2">Eni</p>
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="w-full border-2 border-amber-100 rounded-2xl py-3 text-center appearance-none"
              placeholder="0"
            />
            <p>{unit}</p>
          </div>

          <div className="text-center flex-1">
            <p className="text-lg mb-2">Balandlik</p>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full border-2 border-amber-100 rounded-2xl py-3 text-center appearance-none"
              placeholder="0"
            />
            <p>{unit}</p>
          </div>
        </div>


          {error && <p className="text-red-400 mb-2 text-center">{error}</p>}

          <div className="flex gap-4 justify-center">
            <button
              onClick={calculate}
              className="bg-[#8637E6] text-white px-6 py-2 rounded-2xl flex items-center gap-2 hover:bg-[#8637e683]"
            >
              <CiCalculator1 size={25} /> Hisoblash <FaArrowRightLong />
            </button>
            <button
              onClick={reset}
              className="bg-gray-400 px-4 py-2 rounded-2xl hover:bg-gray-200"
            >
              <RiRestartLine />
            </button>
          </div>

          {result && (
            <div className="mt-6 p-4 bg-[#8637E6] text-white text-xl rounded-2xl text-center whitespace-pre-line">
              {result}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
