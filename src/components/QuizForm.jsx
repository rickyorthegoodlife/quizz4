import React, { useState } from 'react'
    import { useNavigate } from 'react-router-dom'

    export default function QuizForm({ onQuizGenerated }) {
      const [topic, setTopic] = useState('')
      const [difficulty, setDifficulty] = useState('facile')
      const [questionType, setQuestionType] = useState('choix-multiples')
      const [questionCount, setQuestionCount] = useState(5)
      const [apiKey, setApiKey] = useState('')
      const [isLoading, setIsLoading] = useState(false)
      const navigate = useNavigate()

      const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
          const headers = new Headers()
          headers.append('Content-Type', 'application/json')
          headers.append('Authorization', `Bearer ${apiKey}`)

          const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
              model: 'gpt-3.5-turbo',
              messages: [{
                role: 'user',
                content: `Génère ${questionCount} questions de type ${questionType} sur le sujet "${topic}" avec un niveau de difficulté ${difficulty}. Formatte la réponse en JSON avec les champs suivants : question, options (si choix multiples), correctAnswer. Retourne uniquement un tableau JSON valide sans texte supplémentaire.`
              }],
              response_format: { type: "json_object" }
            })
          })

          if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`)
          }

          const data = await response.json()
          const content = data.choices[0].message.content
          
          let questions
          try {
            questions = JSON.parse(content)
            if (questions.questions) {
              questions = questions.questions
            }
          } catch (error) {
            throw new Error('Réponse JSON invalide')
          }

          if (!Array.isArray(questions) || questions.length === 0) {
            throw new Error('Aucune question générée')
          }

          onQuizGenerated(questions)
          navigate('/quiz')
        } catch (error) {
          console.error('Erreur:', error)
          alert(`Erreur : ${error.message}\nVeuillez vérifier votre clé API et réessayer.`)
        } finally {
          setIsLoading(false)
        }
      }

      return (
        <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
          <div className="card max-w-2xl w-full">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Générateur de Quiz</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Sujet :</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Difficulté :</label>
                <select
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                >
                  <option value="facile">Facile</option>
                  <option value="moyen">Moyen</option>
                  <option value="difficile">Difficile</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Type de question :</label>
                <select
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={questionType}
                  onChange={(e) => setQuestionType(e.target.value)}
                >
                  <option value="choix-multiples">Choix multiples</option>
                  <option value="vrai-faux">Vrai/Faux</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Nombre de questions (1-10) :</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={questionCount}
                  onChange={(e) => setQuestionCount(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Clé API OpenAI :</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value.trim())}
                  required
                  placeholder="sk-..."
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary disabled:opacity-50"
                >
                  {isLoading ? 'Génération en cours...' : 'Générer le quiz'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )
    }
