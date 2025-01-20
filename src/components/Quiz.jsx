import React, { useState, useEffect } from 'react'
    import { useNavigate } from 'react-router-dom'

    export default function Quiz({ data, onSubmit }) {
      const [currentQuestion, setCurrentQuestion] = useState(0)
      const [answers, setAnswers] = useState([])
      const navigate = useNavigate()

      useEffect(() => {
        if (!data || data.length === 0 || !data[0]?.question) {
          navigate('/')
        }
      }, [data, navigate])

      if (!data || data.length === 0 || !data[0]?.question) {
        return null
      }

      const question = data[currentQuestion]

      if (!question) {
        return null
      }

      const handleAnswer = (answer) => {
        const newAnswers = [...answers]
        newAnswers[currentQuestion] = answer
        setAnswers(newAnswers)
      }

      const handleNext = () => {
        if (currentQuestion < data.length - 1) {
          setCurrentQuestion(currentQuestion + 1)
        }
      }

      const handlePrevious = () => {
        if (currentQuestion > 0) {
          setCurrentQuestion(currentQuestion - 1)
        }
      }

      const handleSubmit = () => {
        onSubmit(answers)
        navigate('/results')
      }

      const progress = ((currentQuestion + 1) / data.length) * 100

      return (
        <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
          <div className="card max-w-2xl w-full">
            {/* Barre de progression */}
            <div className="mb-6">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-primary h-2.5 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Question {currentQuestion + 1} sur {data.length}
              </div>
            </div>

            <p className="text-lg text-gray-700 mb-6">{question.question}</p>

            {/* Affichage des réponses */}
            {question.options ? (
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <label
                    key={index}
                    className={`block p-4 rounded-lg cursor-pointer transition-all ${
                      answers[currentQuestion] === option
                        ? 'bg-primary/10 border-primary'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <input
                      type="radio"
                      name="answer"
                      value={option}
                      checked={answers[currentQuestion] === option}
                      onChange={() => handleAnswer(option)}
                      className="hidden"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {['Vrai', 'Faux'].map((option) => (
                  <label
                    key={option}
                    className={`block p-4 rounded-lg cursor-pointer transition-all ${
                      answers[currentQuestion] === option
                        ? 'bg-primary/10 border-primary'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <input
                      type="radio"
                      name="answer"
                      value={option}
                      checked={answers[currentQuestion] === option}
                      onChange={() => handleAnswer(option)}
                      className="hidden"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            )}

            <div className="flex justify-between mt-8">
              {currentQuestion > 0 && (
                <button
                  onClick={handlePrevious}
                  className="btn-secondary"
                >
                  Précédent
                </button>
              )}
              {currentQuestion < data.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="btn-primary ml-auto"
                >
                  Suivant
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="btn-primary"
                >
                  Soumettre
                </button>
              )}
            </div>
          </div>
        </div>
      )
    }
