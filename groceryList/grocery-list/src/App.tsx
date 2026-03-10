import { useState, useEffect } from 'react'
import { Check, Trash2, ShoppingBasket, Plus, Trash } from "lucide-react"

interface GroceryItem {
  id: number
  name: string
  count: number
  completed: boolean
}

function App() {
  const [groceries, setGroceries] = useState<GroceryItem[]>(() => {
    const savedGroceries = localStorage.getItem("groceries")
    return savedGroceries ? JSON.parse(savedGroceries) : []
  })
  const [inputValue, setInputValue] = useState<string>("")

  useEffect(() => {
    localStorage.setItem("groceries", JSON.stringify(groceries))
  }, [groceries])

  const addGrocery = () => {
    if (inputValue.trim() === "") return 
    const newGrocery: GroceryItem = {
      id: Date.now(),
      name: inputValue,
      count: 1,
      completed: false
    }
    setGroceries([...groceries, newGrocery])
    setInputValue("")
  }

  const deleteGrocery = (id: number) => {
    setGroceries((prev) => prev.filter((g) => g.id !== id))
  }

  const updateCount = (id: number, newCount: number) => {
    setGroceries((prev) => prev.map((g) => (
      g.id === id ? {...g, count: Math.max(1, isNaN(newCount) ? 1 : newCount)} : g
    )))
  }

  const toggleCompleted = (id: number) => {
    setGroceries((prev) => prev.map((g) => (
      g.id === id ? {...g, completed: !g.completed} : g
    )))
  }

  const completedCount = groceries.filter(g => g.completed).length
  const progressPercent = groceries.length > 0 ? (completedCount / groceries.length) * 100 : 0

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 font-sans text-slate-900">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        
        {/* Header Section */}
        <div className="bg-indigo-600 p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <ShoppingBasket size={28} />
            <h1 className="text-2xl font-bold tracking-tight">Grocery List</h1>
          </div>
          <p className="text-indigo-100 text-sm">Organize your shopping</p>
          
          {/* Progress Bar */}
          {groceries.length > 0 && (
            <div className="mt-6">
              <div className="flex justify-between text-xs mb-1 font-medium">
                <span>Progress</span>
                <span>{completedCount} of {groceries.length} items</span>
              </div>
              <div className="w-full bg-indigo-900/30 rounded-full h-2">
                <div 
                  className="bg-white h-2 rounded-full transition-all duration-500 ease-out" 
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Input Section */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex gap-2">
            <input 
              placeholder="Add an item (e.g. Oat Milk)"
              className="flex-1 bg-white border border-slate-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addGrocery()}
            />
            <button 
              onClick={addGrocery}
              className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              <Plus size={24} />
            </button>
          </div>
        </div>

        {/* List Section */}
        <div className="p-4 max-h-[400px] overflow-y-auto">
          {groceries.length === 0 ? (
            <div className="text-center py-10 text-slate-400">
              <p>Your list is empty.</p>
              <p className="text-sm">Time to stock up!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {groceries.map((g) => (
                <div 
                  key={g.id} 
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-200 ${
                    g.completed ? "bg-slate-50 border-slate-100 opacity-75" : "bg-white border-slate-200 shadow-sm"
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <button 
                      onClick={() => toggleCompleted(g.id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center cursor-pointer justify-center transition-colors ${
                        g.completed ? "bg-emerald-500 border-emerald-500 text-white" : "border-slate-300 hover:border-indigo-500"
                      }`}
                    >
                      {g.completed && <Check size={14} strokeWidth={3} />}
                    </button>
                    <span className={`font-medium transition-all ${g.completed ? "line-through text-slate-400" : "text-slate-700"}`}>
                      {g.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Qty</span>
                      <input
                        type="number"
                        min="1"
                        className="w-10 text-center font-semibold text-indigo-600 bg-transparent outline-none"
                        value={g.count}
                        onChange={(e) => updateCount(g.id, e.target.valueAsNumber)}
                      />
                    </div>
                    <button 
                      onClick={() => deleteGrocery(g.id)}
                      className="text-slate-300 hover:text-red-500 transition-colors p-1 cursor-pointer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {groceries.length > 0 && (
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-center">
            <button 
              onClick={() => setGroceries([])}
              className="flex items-center gap-2 text-sm cursor-pointer font-semibold text-slate-500 hover:text-red-600 transition-colors"
            >
              <Trash size={14} />
              Clear List
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App