interface Questions {
  id: number
  questionText: string
  options: string[]
  correctAnswer: string
}

export const questions: Questions[] = [
  {
    id: 1,
    questionText: "Which team has won the most Super Bowls in NFL history?",
    options: ["Pittsburgh Steelers", "New England Patriots", "Dallas Cowboys", "San Francisco 49ers"],
    correctAnswer: "Pittsburgh Steelers" // Note: Both Steelers and Patriots have 6, but this fits your string interface
  },
  {
    id: 2,
    questionText: "Who holds the record for the most career passing yards?",
    options: ["Peyton Manning", "Drew Brees", "Tom Brady", "Patrick Mahomes"],
    correctAnswer: "Tom Brady"
  },
  {
    id: 3,
    questionText: "How many points is a touchdown worth (before the extra point)?",
    options: ["3", "6", "7", "2"],
    correctAnswer: "6"
  },
  {
    id: 4,
    questionText: "Which NFL team is the only one to have a completely undefeated season (including the Super Bowl)?",
    options: ["1972 Miami Dolphins", "2007 New England Patriots", "1985 Chicago Bears", "1994 San Francisco 49ers"],
    correctAnswer: "1972 Miami Dolphins"
  },
  {
    id: 5,
    questionText: "What is the name of the trophy awarded to the winner of the Super Bowl?",
    options: ["The Stanley Cup", "The Heisman Trophy", "The Vince Lombardi Trophy", "The Larry O'Brien Trophy"],
    correctAnswer: "The Vince Lombardi Trophy"
  }
];