import { useState } from 'react';

export default function App() {
  const [length, setLength] = useState('250');
  const [width, setWidth] = useState('460');
  const [height, setHeight] = useState('150');
  const [unit, setUnit] = useState('mm');
  const [results, setResults] = useState(null);

  const convertToMm = (val, u) => {
    const n = parseFloat(val) || 0;
    if (u === 'cm') return n * 10;
    if (u === 'm') return n * 1000;
    return n;
  };

  const convertFromMm = (mm, u) => {
    if (u === 'cm') return String(mm / 10);
    if (u === 'm') return String(mm / 1000);
    return String(mm);
  };

  // Format numbers with spaces as thousand separators, dot as decimal
  const fmt = (n) => {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  const handleCalculate = () => {
    const l = convertToMm(length, unit);
    const w = convertToMm(width, unit);
    const h = convertToMm(height, unit);

    const volumeMm3 = l * w * h;
    const volumeCm3 = volumeMm3 / 1000;
    const volumeLiters = volumeCm3 / 1000;
    const volumetricWeight = volumeCm3 / 5000;
    // Truncate to 1 decimal (as shown in design: 3.45 → 3.4)
    const volWeightTrunc = Math.floor(volumetricWeight * 10) / 10;
    const tariffVolume = Math.ceil(volumeLiters);
    const rounding = +(tariffVolume - volumeLiters).toFixed(2);
    const fillPercent = (volumeLiters / tariffVolume) * 100;

    const basePrice = 5250;
    const unitPrice = 250;
    const totalPrice = basePrice + (tariffVolume - 1) * unitPrice;

    setResults({
      volumeMm3: fmt(Math.round(volumeMm3)),
      volumeCm3: fmt(Math.round(volumeCm3)),
      volumeLiters: volumeLiters.toFixed(3),
      volumetricWeight: volWeightTrunc.toFixed(1),
      tariffVolume,
      rounding: rounding > 0 ? '+' + rounding.toFixed(2) : '0.00',
      fillPercent: fillPercent.toFixed(1),
      totalPrice: fmt(totalPrice),
      formula: `narx = ${fmt(basePrice)} + (${tariffVolume} - 1) × ${fmt(unitPrice)} = ${fmt(totalPrice)} so'm`,
      dimensions: `o'lcham = ${Math.round(l)} × ${Math.round(w)} × ${Math.round(h)} mm`,
    });
  };

  const handleUnitChange = (newUnit) => {
    const lMm = convertToMm(length, unit);
    const wMm = convertToMm(width, unit);
    const hMm = convertToMm(height, unit);
    setLength(convertFromMm(lMm, newUnit));
    setWidth(convertFromMm(wMm, newUnit));
    setHeight(convertFromMm(hMm, newUnit));
    setUnit(newUnit);
  };

  return (
    <main className="bg-[#010c21] min-h-screen">
      <div className="w-[400px] mx-auto py-[40px] px-0">

        {/* ---- Header ---- */}
        <div className="bg-[#010c21] shadow-[inset_0_0_15px_rgba(155,155,155,0.1)] rounded-[10px] border border-white/30 flex items-center gap-4 px-[30px] py-[15px] mb-[10px]">
          <img src="/logo.png" alt="logo" className="w-[65px] h-[65px] object-contain shrink-0" />
          <div>
            <h1 className="font-[550] text-[17px] text-white">AbBox Kalkulyator</h1>
            <p className="text-[12px] font-[400] text-gray-500">Logistica va narx hisoblash</p>
          </div>
        </div>

        {/* ---- Calculator Body ---- */}
        <div className="bg-[#010c21] shadow-[inset_0_0_15px_rgba(155,155,155,0.1)] rounded-[10px] border border-white/30 px-[30px] py-[20px]">
          {/* Unit Selector */}
          <h2 className="font-[400] text-[15px] text-[#4ca5ff]">O'lchov birligi</h2>
          <div className="flex border border-white/30 rounded-[10px] overflow-hidden my-[10px]">
            {['mm', 'cm', 'm'].map((u) => (
              <button
                key={u}
                onClick={() => handleUnitChange(u)}
                className={`flex-1 py-[10px] text-center transition-all duration-200 ${
                  unit === u
                    ? 'bg-gradient-to-t from-[#11253e] via-[#184075] to-[#0751B2] text-white'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                {u.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Dimension Inputs */}
          <div className="space-y-3">
  {[
    { label: 'Uzunlik (L)', key: 'length', val: length, set: setLength },
    { label: 'Eni (W)', key: 'width', val: width, set: setWidth },
    { label: 'Balandlik (H)', key: 'height', val: height, set: setHeight },
  ].map((dim) => (
    <div
      key={dim.key}
      className="bg-[#0b1a37] rounded-[12px] border border-white/20 p-4"
    >
      <label className="block text-gray-400 text-sm mb-2">
        {dim.label}
      </label>

      <div className="flex items-center">
        <input
          type="number"
          value={dim.val}
          onChange={(e) => dim.set(e.target.value)}
          placeholder="0"
          className="
            flex-1
            bg-transparent
            text-white
            text-3xl
            font-medium
            outline-none
            border-none
            min-w-0
            [appearance:textfield]
            [&::-webkit-outer-spin-button]:appearance-none
            [&::-webkit-inner-spin-button]:appearance-none
          "
        />

        <span className="text-gray-500 text-sm ml-3 shrink-0">
          {unit}
        </span>
      </div>
    </div>
  ))}
</div>

          {/* Hisoblash Button */}
          <button
            onClick={handleCalculate}
            className="w-full bg-gradient-to-l from-[#11253e] via-[#184075] to-[#0751B2] text-white font-[500] rounded-md py-[14px] mt-[15px] hover:opacity-90 transition-opacity text-[16px]"
          >
            Hisoblash
          </button>

          {/* Price Display */}
          <div className="bg-gradient-to-l from-[#11253e] via-[#184075] to-[#0751B2] w-full text-center my-[20px] rounded-md py-[15px]">
            <p className="text-gray-400 text-[15px]">Logistica narxi</p>
            <h2 className="text-white text-[35px] font-[550]">
              {results ? results.totalPrice : '0'}{' '}
              <span className="text-[18px] text-gray-400">so'm</span>
            </h2>
          </div>

          {/* ---- Results ---- */}
          {results && (
            <>
              {/* Volume Data */}
              <div className="w-full shadow-[inset_0_0_15px_rgba(155,155,155,0.1)] rounded-[10px] border border-white/30 p-[15px]">
                <h2 className="text-[#4CA5FF] text-[15px] mb-2">Hajm ma'lumotlari</h2>
                <div className="grid grid-cols-2 gap-[8px]">
                  <div className="rounded-[10px] border border-white/20 p-[8px]">
                    <p className="text-gray-400 text-[12px]">Hajm (mm³)</p>
                    <p className="text-white text-[18px]">{results.volumeMm3}</p>
                  </div>
                  <div className="rounded-[10px] border border-white/20 p-[8px]">
                    <p className="text-gray-400 text-[12px]">Hajm (cm³)</p>
                    <p className="text-white text-[18px]">{results.volumeCm3}</p>
                  </div>
                  <div className="rounded-[10px] border border-white/20 p-[8px]">
                    <p className="text-gray-400 text-[12px]">Haqiqiy hajm</p>
                    <p className="text-white text-[18px]">{results.volumeLiters} L</p>
                  </div>
                  <div className="rounded-[10px] border border-white/20 p-[8px]">
                    <p className="text-gray-400 text-[12px]">Vol. og'irlik</p>
                    <p className="text-white text-[18px]">{results.volumetricWeight} kg</p>
                  </div>
                </div>
              </div>

              {/* Tariff Card */}
              <div className="w-full shadow-[inset_0_0_15px_rgba(155,155,155,0.1)] rounded-[10px] border border-white/30 p-[15px] mt-[15px]">
                <p className="text-green-400 text-sm mb-3">Tarif</p>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="text-gray-400 text-xs">Tarif hajmi</p>
                    <p className="text-white text-2xl">{results.tariffVolume} L</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-xs">Yaxlitlash</p>
                    <p className="text-green-400 text-sm font-medium">{results.rounding} L</p>
                  </div>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1.5 mb-2">
                  <div
                    className="bg-green-500 h-1.5 rounded-full"
                    style={{ width: `${Math.min(results.fillPercent, 100)}%` }}
                  ></div>
                </div>
                <p className="text-gray-400 text-xs">{results.fillPercent}% to'ldirilgan</p>
              </div>

              {/* Formula */}
              <div className="w-full shadow-[inset_0_0_15px_rgba(155,155,155,0.1)] rounded-[10px] border border-white/30 p-[15px] mt-[15px]">
                <p className="text-gray-400 text-sm">{results.formula}</p>
                <p className="text-gray-400 text-sm mt-1">{results.dimensions}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}