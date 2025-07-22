import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Play, 
  Mic, 
  Brain, 
  Trophy, 
  Heart, 
  Star,
  Volume2,
  Users,
  Target,
  Sparkles,
  Pause,
  VolumeX,
  MicIcon
} from 'lucide-react'

export default function LandingPage() {
  const navigate = useNavigate()
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentDemo, setCurrentDemo] = useState(0)
  const [isListening, setIsListening] = useState(false)
  const [userAnswer, setUserAnswer] = useState('')
  const [waitingForAnswer, setWaitingForAnswer] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null)
  const recognitionRef = useRef<any>(null)

  const demoScripts = [
    {
      text: "Hi there! I'm your AI learning companion. Let's practice some math together!",
      voice: "friendly",
      waitForAnswer: false
    },
    {
      text: "What's 5 plus 3? Take your time and speak your answer when you're ready.",
      voice: "encouraging",
      waitForAnswer: true,
      expectedAnswer: "8",
      question: "5 + 3"
    },
    {
      text: "Great job! That's exactly right - 5 plus 3 equals 8! You're doing amazing!",
      voice: "celebrating",
      waitForAnswer: false
    },
    {
      text: "Let's try something a bit more challenging. Can you tell me what 12 minus 7 is?",
      voice: "supportive",
      waitForAnswer: true,
      expectedAnswer: "5",
      question: "12 - 7"
    },
    {
      text: "Wonderful! You got it right again! I love how you're thinking through each problem.",
      voice: "proud",
      waitForAnswer: false
    }
  ]

  const handleStartLearning = () => {
    navigate('/dashboard')
  }

  const handleParentPortal = () => {
    navigate('/parent')
  }

  // Speech synthesis function
  const speakText = (text: string, onComplete?: () => void) => {
    return new Promise<void>((resolve) => {
      if ('speechSynthesis' in window) {
        // Cancel any ongoing speech
        window.speechSynthesis.cancel()
        
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.rate = 0.9
        utterance.pitch = 1.1
        utterance.volume = 1.0
        
        // Wait for voices to load
        const setVoiceAndSpeak = () => {
          const voices = window.speechSynthesis.getVoices()
          
          // Try to find a good English voice
          const preferredVoice = voices.find(voice => 
            voice.lang.includes('en') && (
              voice.name.includes('Google') || 
              voice.name.includes('Microsoft') ||
              voice.name.includes('Alex') ||
              voice.name.includes('Samantha')
            )
          ) || voices.find(voice => voice.lang.includes('en'))
          
          if (preferredVoice) {
            utterance.voice = preferredVoice
          }

          utterance.onend = () => {
            resolve()
            if (onComplete) onComplete()
          }

          utterance.onerror = (error) => {
            console.log('Speech synthesis error:', error)
            resolve()
            if (onComplete) onComplete()
          }

          speechRef.current = utterance
          window.speechSynthesis.speak(utterance)
        }

        // If voices are already loaded
        if (window.speechSynthesis.getVoices().length > 0) {
          setVoiceAndSpeak()
        } else {
          // Wait for voices to load
          window.speechSynthesis.onvoiceschanged = () => {
            setVoiceAndSpeak()
          }
        }
      } else {
        resolve()
        if (onComplete) onComplete()
      }
    })
  }

  // Speech recognition functions
  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start()
      } catch (error) {
        console.log('Speech recognition start error:', error)
      }
    }
  }

  const continueDemo = () => {
    const nextIndex = currentDemo + 1
    if (nextIndex >= demoScripts.length || !isPlaying) {
      setIsPlaying(false)
      setCurrentDemo(0)
      setWaitingForAnswer(false)
      setUserAnswer('')
      return
    }

    setCurrentDemo(nextIndex)
    const script = demoScripts[nextIndex]
    
    speakText(script.text).then(() => {
      if (script.waitForAnswer && isPlaying) {
        setWaitingForAnswer(true)
        setTimeout(() => {
          startListening()
        }, 1000)
      } else {
        setTimeout(() => {
          if (isPlaying) {
            continueDemo()
          }
        }, 1500)
      }
    })
  }

  // Initialize speech recognition
  const initSpeechRecognition = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
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
        setIsListening(false)
        
        // Check if answer is correct
        const currentScript = demoScripts[currentDemo]
        if (currentScript?.expectedAnswer) {
          const isCorrect = transcript.includes(currentScript.expectedAnswer) || 
                           transcript === currentScript.expectedAnswer
          
          if (isCorrect) {
            // Continue to next step (celebration)
            setTimeout(() => {
              setWaitingForAnswer(false)
              continueDemo()
            }, 1000)
          } else {
            // Give encouraging feedback and try again
            speakText("That's not quite right, but keep trying! What do you think the answer is?")
            setTimeout(() => {
              startListening()
            }, 3000)
          }
        }
      }
      
      recognition.onerror = (event: any) => {
        console.log('Speech recognition error:', event.error)
        setIsListening(false)
        if (waitingForAnswer) {
          // Retry listening
          setTimeout(() => {
            startListening()
          }, 2000)
        }
      }
      
      recognition.onend = () => {
        setIsListening(false)
      }
      
      recognitionRef.current = recognition
    }
  }

  const playDemoSequence = () => {
    // Initialize speech recognition
    initSpeechRecognition()
    
    // Start with first script
    setCurrentDemo(0)
    const firstScript = demoScripts[0]
    
    speakText(firstScript.text).then(() => {
      if (firstScript.waitForAnswer && isPlaying) {
        setWaitingForAnswer(true)
        setTimeout(() => {
          startListening()
        }, 1000)
      } else {
        setTimeout(() => {
          if (isPlaying) {
            continueDemo()
          }
        }, 1500)
      }
    })
  }

  const handleDemoToggle = () => {
    if (isPlaying) {
      // Stop the demo
      setIsPlaying(false)
      setCurrentDemo(0)
      setWaitingForAnswer(false)
      setUserAnswer('')
      if (speechRef.current) {
        window.speechSynthesis.cancel()
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    } else {
      // Start the demo
      setIsPlaying(true)
      playDemoSequence()
    }
  }

  useEffect(() => {
    // Load voices when component mounts
    if ('speechSynthesis' in window) {
      const loadVoices = () => {
        window.speechSynthesis.getVoices()
      }
      
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices
      }
      loadVoices()
    }

    return () => {
      if (speechRef.current) {
        window.speechSynthesis.cancel()
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  useEffect(() => {
    if (!isPlaying && speechRef.current) {
      window.speechSynthesis.cancel()
    }
  }, [isPlaying])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-amber-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">Schoolinmypocket</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={handleParentPortal}>
              Parent Portal
            </Button>
            <Button onClick={handleStartLearning}>
              Start Learning
            </Button>
          </div>
        </nav>
      </header>

      {/* Introduction Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 text-center">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <span className="text-primary font-semibold">Experience the Magic</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Hear How Our AI Companion Teaches Math
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Click "Hear Demo" below to experience a real conversation between our AI tutor and a child. 
              You'll hear how we make learning interactive, supportive, and fun through natural voice interaction.
            </p>
            <div className="flex items-center justify-center space-x-6 pt-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Volume2 className="w-4 h-4 text-primary" />
                <span>Natural Voice Interaction</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Heart className="w-4 h-4 text-pink-500" />
                <span>Encouraging Feedback</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Trophy className="w-4 h-4 text-green-500" />
                <span>Celebrates Success</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-accent/10 text-accent-foreground border-accent/20">
                🎯 For Kids Ages 3-12
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Learning Made
                <span className="text-primary block">Fun & Interactive</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Your AI-powered learning companion that makes mathematics exciting through 
                voice interaction, adaptive challenges, and game-like experiences.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={handleStartLearning}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Learning Adventure
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={handleDemoToggle}
                className={`px-8 py-4 text-lg transition-all duration-300 ${
                  isPlaying ? 'bg-accent/10 border-accent text-accent' : ''
                }`}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 mr-2" />
                ) : (
                  <Volume2 className="w-5 h-5 mr-2" />
                )}
                {isPlaying ? 'Stop Demo' : 'Hear Demo'}
              </Button>
            </div>

            {/* Demo Status */}
            {isPlaying && (
              <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-6 border border-primary/10">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isListening ? 'bg-red-500 animate-pulse' : 'bg-primary animate-pulse'
                  }`}>
                    {isListening ? (
                      <MicIcon className="w-6 h-6 text-white" />
                    ) : (
                      <Volume2 className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {isListening ? '🎤 Listening for your answer...' : '🎧 Voice Demo Playing...'}
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      {demoScripts[currentDemo]?.text}
                    </p>
                    {waitingForAnswer && (
                      <div className="bg-blue-50 rounded-lg p-3 mb-3">
                        <p className="text-sm text-blue-700 font-medium">
                          Question: {demoScripts[currentDemo]?.question}
                        </p>
                        <p className="text-xs text-blue-600 mt-1">
                          {isListening ? 'Speak your answer now!' : 'Getting ready to listen...'}
                        </p>
                        {userAnswer && (
                          <p className="text-xs text-gray-600 mt-1">
                            You said: "{userAnswer}"
                          </p>
                        )}
                      </div>
                    )}
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <div className="flex space-x-1">
                        {demoScripts.map((_, index) => (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                              index === currentDemo
                                ? 'bg-primary'
                                : index < currentDemo
                                ? 'bg-accent'
                                : 'bg-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span>Step {currentDemo + 1} of {demoScripts.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-4 pt-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Mic className="w-5 h-5 text-primary" />
                </div>
                <span className="font-medium text-gray-700">Voice Interaction</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-accent" />
                </div>
                <span className="font-medium text-gray-700">Adaptive Learning</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-green-600" />
                </div>
                <span className="font-medium text-gray-700">Achievement System</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-pink-600" />
                </div>
                <span className="font-medium text-gray-700">Supportive Feedback</span>
              </div>
            </div>
          </div>

          {/* Hero Animation/Illustration */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8 h-96 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto animate-pulse">
                  <Sparkles className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">AI Learning Companion</h3>
                <p className="text-gray-600">Interactive • Adaptive • Fun</p>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute top-4 right-4 w-12 h-12 bg-accent rounded-full flex items-center justify-center animate-bounce">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div className="absolute bottom-4 left-4 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div className="absolute top-1/2 left-4 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center animate-bounce delay-300">
                <Heart className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-gray-900">Why Kids Love Schoolinmypocket</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our unique approach combines the excitement of gaming with proven educational methods
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                <Mic className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Voice Interaction</h3>
              <p className="text-gray-600 leading-relaxed">
                Kids speak their answers naturally. Our AI listens, understands, and responds 
                with encouraging feedback that builds confidence.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto">
                <Target className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Adaptive Learning</h3>
              <p className="text-gray-600 leading-relaxed">
                Every child learns differently. Our system adapts to your child's pace, 
                ensuring they're always appropriately challenged.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Parent Insights</h3>
              <p className="text-gray-600 leading-relaxed">
                Track your child's progress with detailed analytics and celebrate 
                their achievements together.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Learning?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of families making math fun and engaging
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={handleStartLearning}
              className="px-8 py-4 text-lg"
            >
              Start Free Trial
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={handleParentPortal}
              className="px-8 py-4 text-lg bg-transparent border-white text-white hover:bg-white hover:text-primary"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-gray-900">Schoolinmypocket</span>
          </div>
          <p className="text-gray-600 text-center">
            Making learning fun for children across the DACH region
          </p>
        </div>
      </footer>
    </div>
  )
}