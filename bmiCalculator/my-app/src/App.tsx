import { useState } from 'react'

function App() {
  const [weight, setWeight] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)
  const [results, setResults] = useState<number | null>(null)

  const calculate = () => {
    if (height === 0) return;
    const bmi = (weight / (height * height)) * 703
    setResults(Number(bmi.toFixed(1)))
  }

  const reset = () => {
    setWeight(0)
    setHeight(0)
    setResults(null)
  }

  // Helper to get color and text based on score
  const getCategory = (bmi: number) => {
    if (bmi < 18.5) return { label: "Underweight", color: "text-blue-500" };
    if (bmi < 25) return { label: "Healthy Weight", color: "text-emerald-500" };
    if (bmi < 30) return { label: "Overweight", color: "text-orange-500" };
    return { label: "Obese", color: "text-red-500" };
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-slate-100 mt-20 transition-all">
        
        <h2 className="text-3xl font-extrabold text-slate-800 mb-6 text-center italic tracking-tight">
          BMI <span className="text-indigo-600">PRO</span>
        </h2>

        <div className="space-y-6">
          {/* Weight Input */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-slate-500 mb-2 ml-1">Weight (lbs)</label>
            <input
              type="number"
              value={weight || ""}
              placeholder="e.g. 165"
              className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 focus:outline-none transition-all text-lg font-medium"
              onChange={(e) => setWeight(e.target.valueAsNumber)}
            />
          </div>

          {/* Height Input */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-slate-500 mb-2 ml-1">Height (total inches)</label>
            <input 
              type="number"
              value={height || ""}
              placeholder="e.g. 70"
              className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 focus:outline-none transition-all text-lg font-medium"
              onChange={(e) => setHeight(e.target.valueAsNumber)}
            />
          </div>

          <button 
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 transition-all active:scale-95 cursor-pointer"
            onClick={calculate}
          >
            Calculate BMI
          </button>
        </div>

        {results !== null && (
          <div className="mt-8 p-6 bg-indigo-50 rounded-3xl text-center border border-indigo-100 animate-in fade-in zoom-in duration-300">
            <p className="text-slate-500 font-medium uppercase text-xs tracking-widest mb-1">Your Result</p>
            <div className="text-5xl font-black text-slate-900 mb-2">{results}</div>
            
            <p className={`font-bold text-lg ${getCategory(results).color}`}>
              {getCategory(results).label}
            </p>

            <button 
              className="mt-6 text-slate-400 hover:text-slate-600 text-sm font-semibold underline decoration-2 underline-offset-4 cursor-pointer" 
              onClick={reset}
            >
              Reset Calculator
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App