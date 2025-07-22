import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  ArrowLeft,
  ArrowRight,
  Star,
  Heart,
  Trophy,
  RefreshCw,
  CheckCircle,
  XCircle,
  Sparkles
} from 'lucide-react'

interface Question {
  id: number
  type: 'addition' | 'counting' | 'shapes'
  question: string
  answer: string | number
  options?: string[]
  visual?: string
  hint?: string
}

export default function LearningSession() {
  const navigate = useNavigate()
  const location = useLocation()
  const activityId = location.state?.activityId || 1

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [userAnswer, setUserAnswer] = useState('')
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [score, setScore] = useState(0)
  const [hearts, setHearts] = useState(3)
  const [stars, setStars] = useState(0)

  const questions: Question[] = [
    {
      id: 1,
      type: 'addition',
      question: 'What is 3 + 2?',
      answer: 5,
      visual: '🍎🍎🍎 + 🍎🍎 = ?',
      hint: 'Count all the apples together!'
    },
    {
      id: 2,
      type: 'counting',
      question: 'How many stars do you see?',
      answer: 4,
      visual: '⭐⭐⭐⭐',
      hint: 'Count each star one by one!'
    },
    {
      id: 3,
      type: 'addition',
      question: 'What is 5 + 1?',
      answer: 6,
      visual: '🌟🌟🌟🌟🌟 + 🌟 = ?',
      hint: 'Add one more star to the group!'
    },
    {
      id: 4,
      type: 'shapes',
      question: 'What shape is this?',
      answer: 'circle',
      visual: '⭕',
      options: ['circle', 'square', 'triangle'],
      hint: 'This shape is round like a ball!'
    },
    {
      id: 5,
      type: 'addition',
      question: 'What is 4 + 3?',
      answer: 7,
      visual: '🎈🎈🎈🎈 + 🎈🎈🎈 = ?',
      hint: 'Count all the balloons!'
    }
  ]

  const currentQ = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  const speakText = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true)
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.8
      utterance.pitch = 1.2
      utterance.onend = () => setIsSpeaking(false)
      speechSynthesis.speak(utterance)
    }
  }, [])

  const checkAnswer = (answer: string) => {
    const correct = answer === currentQ.answer.toString().toLowerCase()
    setIsCorrect(correct)
    setShowFeedback(true)

    if (correct) {
      setScore(score + 1)
      setStars(stars + 1)
      speakText("Excellent! That's correct! You're doing great!")
    } else {
      setHearts(Math.max(0, hearts - 1))
      speakText("Not quite right, but that's okay! Let me help you.")
    }

    setTimeout(() => {
      setShowFeedback(false)
      setIsCorrect(null)
      setUserAnswer('')
    }, 3000)
  }

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      const recognition = new SpeechRecognition()
      
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = 'en-US'

      recognition.onstart = () => {
        setIsListening(true)
      }

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase().trim()
        setUserAnswer(transcript)
        checkAnswer(transcript)
      }

      recognition.onerror = () => {
        setIsListening(false)
        speakText("I didn't catch that. Let's try again!")
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognition.start()
    } else {
      // Fallback for browsers without speech recognition
      const answer = prompt('Please type your answer:')
      if (answer) {
        setUserAnswer(answer)
        checkAnswer(answer.toLowerCase().trim())
      }
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Session complete
      navigate('/progress', { 
        state: { 
          sessionComplete: true, 
          score, 
          totalQuestions: questions.length,
          stars 
        } 
      })
    }
  }

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const giveHint = () => {
    if (currentQ.hint) {
      speakText(currentQ.hint)
    }
  }

  const repeatQuestion = () => {
    speakText(currentQ.question)
  }

  useEffect(() => {
    // Speak the question when it loads
    setTimeout(() => {
      speakText(`Question ${currentQuestion + 1}. ${currentQ.question}`)
    }, 1000)
  }, [currentQuestion, currentQ.question, speakText])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-amber-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {[...Array(3)].map((_, i) => (
                  <Heart 
                    key={i} 
                    className={`w-5 h-5 ${i < hearts ? 'text-red-500 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-bold">{stars}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Main Learning Area */}
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-2xl">
            <CardContent className="p-8">
              {/* Question Type Badge */}
              <div className="flex justify-center mb-6">
                <Badge className="bg-primary/10 text-primary px-4 py-2 text-lg">
                  {currentQ.type.charAt(0).toUpperCase() + currentQ.type.slice(1)} Practice
                </Badge>
              </div>

              {/* Visual Element */}
              {currentQ.visual && (
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">{currentQ.visual}</div>
                </div>
              )}

              {/* Question */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {currentQ.question}
                </h2>
                
                {/* Options for multiple choice */}
                {currentQ.options && (
                  <div className="flex justify-center space-x-4 mb-6">
                    {currentQ.options.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="lg"
                        onClick={() => checkAnswer(option)}
                        className="px-8 py-4 text-lg"
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                )}
              </div>

              {/* Voice Interaction */}
              <div className="text-center mb-8">
                <div className="flex justify-center space-x-4 mb-6">
                  <Button
                    size="lg"
                    onClick={startListening}
                    disabled={isListening}
                    className={`px-8 py-4 text-lg ${
                      isListening 
                        ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                        : 'bg-primary hover:bg-primary/90'
                    }`}
                  >
                    {isListening ? (
                      <>
                        <MicOff className="w-5 h-5 mr-2" />
                        Listening...
                      </>
                    ) : (
                      <>
                        <Mic className="w-5 h-5 mr-2" />
                        Speak Your Answer
                      </>
                    )}
                  </Button>
                </div>

                {userAnswer && (
                  <div className="mb-4">
                    <p className="text-lg text-gray-600">You said: "{userAnswer}"</p>
                  </div>
                )}

                {/* Helper Buttons */}
                <div className="flex justify-center space-x-3">
                  <Button variant="outline" onClick={repeatQuestion} disabled={isSpeaking}>
                    {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </Button>
                  <Button variant="outline" onClick={giveHint}>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Hint
                  </Button>
                  <Button variant="outline" onClick={() => setCurrentQuestion(currentQuestion)}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Try Again
                  </Button>
                </div>
              </div>

              {/* Feedback */}
              {showFeedback && (
                <div className={`text-center p-6 rounded-2xl mb-6 ${
                  isCorrect 
                    ? 'bg-green-100 border-2 border-green-200' 
                    : 'bg-orange-100 border-2 border-orange-200'
                }`}>
                  <div className="flex justify-center mb-3">
                    {isCorrect ? (
                      <CheckCircle className="w-12 h-12 text-green-600" />
                    ) : (
                      <XCircle className="w-12 h-12 text-orange-600" />
                    )}
                  </div>
                  <h3 className={`text-2xl font-bold mb-2 ${
                    isCorrect ? 'text-green-800' : 'text-orange-800'
                  }`}>
                    {isCorrect ? 'Excellent!' : 'Not quite right!'}
                  </h3>
                  <p className={`text-lg ${
                    isCorrect ? 'text-green-700' : 'text-orange-700'
                  }`}>
                    {isCorrect 
                      ? 'You got it right! Keep up the great work!' 
                      : `The correct answer is ${currentQ.answer}. ${currentQ.hint || "Let's try the next one!"}`
                    }
                  </p>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between items-center">
                <Button 
                  variant="outline" 
                  onClick={previousQuestion}
                  disabled={currentQuestion === 0}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                <div className="text-center">
                  <div className="text-sm text-gray-600">Score: {score}/{questions.length}</div>
                </div>

                <Button 
                  onClick={nextQuestion}
                  disabled={!showFeedback && !userAnswer}
                >
                  {currentQuestion === questions.length - 1 ? (
                    <>
                      <Trophy className="w-4 h-4 mr-2" />
                      Finish
                    </>
                  ) : (
                    <>
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}