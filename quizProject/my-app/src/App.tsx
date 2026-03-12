import { useState } from "react"
import { questions } from "./questionData"

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false); // To know when to stop

  // Get the current question object
  const activeQuestion = questions[currentQuestion];

  const handleAnswer = (selectedOption: string) => {
    
    if (selectedOption === activeQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }

    
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  if (showResults) {
    return (
      <div className="flex flex-col items-center m-10">
        <h1 className="text-2xl font-bold">Quiz Finished!</h1>
        <p className="text-xl">You scored {score} out of {questions.length}</p>
        <button 
          onClick={() => {setCurrentQuestion(0); setScore(0); setShowResults(false)}}
          className="mt-4 bg-teal-600 text-white p-2 rounded cursor-pointer"
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center m-10">
      <h1 className="text-3xl font-bold mb-6">NFL Quiz</h1>
      
      <div className="bg-slate-100 p-8 rounded-xl shadow-lg w-full max-w-md">
        
        <h2 className="text-lg text-slate-500 mb-2">
          Question {currentQuestion + 1} of {questions.length}
        </h2>
        <h1 className="text-xl font-semibold mb-6">{activeQuestion.questionText}</h1>
        
        
        <div className="flex flex-col gap-3">
          {activeQuestion.options.map((option: string, index) => (
            <button 
              key={index}
              onClick={() => handleAnswer(option)}
              className="bg-white border-2 border-slate-200 cursor-pointer hover:border-teal-500 hover:bg-teal-50 p-3 rounded-lg transition-all text-left"
            >
              {option}
            </button>
          ))}
        </div>

        
        <div className="flex justify-between mt-8 border-t pt-4">
          <button 
            disabled={currentQuestion === 0}
            onClick={() => setCurrentQuestion(prev => prev - 1)}
            className="text-slate-400 disabled:opacity-0"
          >
            Previous
          </button>
        </div>
      </div>
    </div>
  );
}

export default App
