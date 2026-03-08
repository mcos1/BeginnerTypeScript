import { useState, useEffect } from 'react'
import { Check, Trash2, Plus } from "lucide-react"

interface Todo {
  id: number
  text: string
  completed: boolean
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem("todos")
    return savedTodos ? JSON.parse(savedTodos) : []
  })
  const [inputValue, setInputValue] = useState<string>("")

  const addTask = () => {
    if (inputValue.trim() === "") return

    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue,
      completed: false
    }
    
    setTodos([...todos, newTodo])
    setInputValue("")
  }

  const toggleCompleted = (id: number) => {

    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed}
      } 
      return todo
    })

    setTodos(updatedTodos)
  }

  const deleteTask = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <div className="min-h-screen bg-slate-200 flex flex-col items-center py-20 px-4">
      {/* Main Card */}
      <div className="w-full max-w-md bg-white border border-slate-300 shadow-xl rounded-2xl overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-teal-700 p-8 text-center">
          <h1 className="text-3xl font-bold text-white tracking-tight">Daily Tasks</h1>
          <p className="text-teal-100 text-sm mt-1">Stay organized, stay productive</p>
        </div>

        <div className="p-6">
          {/* Input Group */}
          <div className="flex gap-2 mb-8">
            <input 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
              placeholder="What needs to be done?"
              className="flex-1 bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block p-2.5 outline-none transition-all"
            />
            <button 
              onClick={addTask}
              className="bg-teal-600 hover:bg-teal-700 text-white p-2.5 rounded-lg transition-colors flex items-center justify-center cursor-pointer"
            >
              <Plus size={20} strokeWidth={3} />
            </button>
          </div>

          {/* Tasks List */}
          <div className="space-y-3">
            {todos.length === 0 ? (
              <p className="text-center text-slate-400 py-10 italic">Your list is empty!</p>
            ) : (
              todos.map((todo) => (
                <div 
                  key={todo.id} 
                  className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
                    todo.completed 
                      ? "bg-slate-50 border-slate-200 opacity-75" 
                      : "bg-white border-slate-200 shadow-sm hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <button
                      onClick={() => toggleCompleted(todo.id)}
                      className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors cursor-pointer ${
                        todo.completed 
                          ? "bg-teal-600 border-teal-600" 
                          : "border-slate-300 hover:border-teal-500"
                      }`}
                    >
                      {todo.completed && <Check size={14} className="text-white stroke-[4px]" />}
                    </button>
                    
                    <p className={`text-sm font-medium truncate ${
                      todo.completed ? "line-through text-slate-400" : "text-slate-700"
                    }`}>
                      {todo.text}
                    </p>
                  </div>

                  <button 
                    onClick={() => deleteTask(todo.id)} 
                    className="text-slate-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
