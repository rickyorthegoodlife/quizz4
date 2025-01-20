import React, { useState } from 'react'
    import { Routes, Route } from 'react-router-dom'
    import QuizForm from './components/QuizForm'
    import Quiz from './components/Quiz'
    import Results from './components/Results'

    function App() {
      const [quizData, setQuizData] = useState(null)
      const [userAnswers, setUserAnswers] = useState([])

      const handleQuizGenerated = (data) => {
        setQuizData(data)
      }

      const handleQuizSubmit = (answers) => {
        setUserAnswers(answers)
      }

      return (
        <div className="container">
          <Routes>
            <Route path="/" element={
              <QuizForm 
                onQuizGenerated={handleQuizGenerated} 
              />
            } />
            <Route path="/quiz" element={
              <Quiz 
                data={quizData} 
                onSubmit={handleQuizSubmit}
              />
            } />
            <Route path="/results" element={
              <Results 
                data={quizData} 
                userAnswers={userAnswers}
              />
            } />
          </Routes>
        </div>
      )
    }

    export default App
