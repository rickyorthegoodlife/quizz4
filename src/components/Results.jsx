import React, { useEffect } from 'react'
    import { useNavigate } from 'react-router-dom'

    export default function Results({ data, userAnswers }) {
      const navigate = useNavigate()

      useEffect(() => {
        if (!data || !userAnswers) {
          navigate('/')
        }
      }, [data, userAnswers, navigate])

      if (!data || !userAnswers) {
        return null
      }

      const score = data.reduce((acc, question, index) => {
        return acc + (userAnswers[index] === question.correctAnswer ? 1 : 0)
      }, 0)

      const handleNewQuiz = () => {
        navigate('/')
      }

      return (
        <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
          <div className="card max-w-2xl w-full">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Résultats</h2>
            <div className="text-center mb-8">
              <div className="text-4xl font-bold text-primary mb-2">{score}/{data.length}</div>
              <div className="text-gray-600">Score final</div>
            </div>

            <div className="space-y-6">
              {data.map((question, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Question {index + 1}</h3>
                  <p className="text-gray-700 mb-4">{question.question}</p>
                  <div className={`p-2 rounded ${
                    userAnswers[index] === question.correctAnswer
                      ? 'bg-green-50 text-green-700'
                      : 'bg-red-50 text-red-700'
                  }`}>
                    Votre réponse : {userAnswers[index]} 
                    {userAnswers[index] === question.correctAnswer ? ' ✓' : ' ✗'}
                  </div>
                  <div className="mt-2 text-gray-600">
                    Réponse correcte : {question.correctAnswer}
                  </div>
                </div>
              ))}
            </div>

            {/* Bouton Nouveau quiz */}
            <div className="mt-8 text-center">
              <button
                onClick={handleNewQuiz}
                className="btn-primary"
              >
                Nouveau quiz
              </button>
            </div>
          </div>
        </div>
      )
    }
