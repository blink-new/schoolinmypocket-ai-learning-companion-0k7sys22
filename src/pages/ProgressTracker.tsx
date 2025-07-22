import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  ArrowLeft,
  Trophy,
  Star,
  Calendar,
  Clock,
  Target,
  TrendingUp,
  Award,
  Brain,
  Heart,
  Zap,
  CheckCircle,
  BarChart3
} from 'lucide-react'

export default function ProgressTracker() {
  const navigate = useNavigate()
  const location = useLocation()
  const sessionData = location.state

  const [selectedPeriod, setSelectedPeriod] = useState('week')

  const weeklyProgress = [
    { day: 'Mon', lessons: 3, minutes: 25, stars: 8 },
    { day: 'Tue', lessons: 2, minutes: 18, stars: 6 },
    { day: 'Wed', lessons: 4, minutes: 32, stars: 11 },
    { day: 'Thu', lessons: 1, minutes: 12, stars: 3 },
    { day: 'Fri', lessons: 3, minutes: 28, stars: 9 },
    { day: 'Sat', lessons: 5, minutes: 45, stars: 14 },
    { day: 'Sun', lessons: 2, minutes: 20, stars: 6 }
  ]

  const achievements = [
    { 
      title: 'First Steps', 
      description: 'Completed your first lesson', 
      earned: true, 
      date: '2024-01-15',
      icon: Target,
      color: 'text-green-600'
    },
    { 
      title: 'Voice Master', 
      description: 'Used voice interaction 10 times', 
      earned: true, 
      date: '2024-01-16',
      icon: Brain,
      color: 'text-blue-600'
    },
    { 
      title: 'Quick Learner', 
      description: 'Completed 5 lessons in one day', 
      earned: true, 
      date: '2024-01-20',
      icon: Zap,
      color: 'text-yellow-600'
    },
    { 
      title: 'Math Wizard', 
      description: 'Perfect score on 3 lessons', 
      earned: false, 
      date: null,
      icon: Trophy,
      color: 'text-purple-600'
    },
    { 
      title: 'Consistent Learner', 
      description: 'Learn for 7 days in a row', 
      earned: false, 
      date: null,
      icon: Calendar,
      color: 'text-orange-600'
    },
    { 
      title: 'Star Collector', 
      description: 'Earn 50 stars total', 
      earned: false, 
      date: null,
      icon: Star,
      color: 'text-pink-600'
    }
  ]

  const skillProgress = [
    { skill: 'Addition', level: 'Beginner', progress: 75, total: 20, completed: 15 },
    { skill: 'Counting', level: 'Intermediate', progress: 90, total: 15, completed: 14 },
    { skill: 'Shapes', level: 'Beginner', progress: 45, total: 12, completed: 5 },
    { skill: 'Subtraction', level: 'Not Started', progress: 0, total: 18, completed: 0 },
    { skill: 'Patterns', level: 'Beginner', progress: 30, total: 10, completed: 3 }
  ]

  const totalStars = weeklyProgress.reduce((sum, day) => sum + day.stars, 0)
  const totalMinutes = weeklyProgress.reduce((sum, day) => sum + day.minutes, 0)
  const totalLessons = weeklyProgress.reduce((sum, day) => sum + day.lessons, 0)

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
            <h1 className="text-2xl font-bold text-gray-900">Learning Progress</h1>
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Session Complete Celebration */}
        {sessionData?.sessionComplete && (
          <div className="mb-8">
            <Card className="border-0 shadow-2xl bg-gradient-to-r from-primary to-primary/80 text-white">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  <Trophy className="w-16 h-16 text-yellow-300" />
                </div>
                <h2 className="text-3xl font-bold mb-2">Fantastic Work!</h2>
                <p className="text-xl mb-4">You completed the learning session!</p>
                <div className="flex justify-center space-x-8 text-center">
                  <div>
                    <div className="text-2xl font-bold">{sessionData.score}</div>
                    <div className="text-sm opacity-90">Correct Answers</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{sessionData.totalQuestions}</div>
                    <div className="text-sm opacity-90">Total Questions</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{sessionData.stars}</div>
                    <div className="text-sm opacity-90">Stars Earned</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Period Selection */}
        <div className="mb-8">
          <div className="flex justify-center space-x-2">
            {['week', 'month', 'all'].map((period) => (
              <Button
                key={period}
                variant={selectedPeriod === period ? "default" : "outline"}
                onClick={() => setSelectedPeriod(period)}
                className="capitalize"
              >
                This {period}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Stats */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Trophy className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{totalLessons}</div>
                  <div className="text-sm text-gray-600">Lessons Completed</div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-6 h-6 text-accent" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{totalMinutes}</div>
                  <div className="text-sm text-gray-600">Minutes Learned</div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Star className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{totalStars}</div>
                  <div className="text-sm text-gray-600">Stars Earned</div>
                </CardContent>
              </Card>
            </div>

            {/* Weekly Progress Chart */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <span>Weekly Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyProgress.map((day, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-12 text-sm font-medium text-gray-600">{day.day}</div>
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span>{day.lessons} lessons</span>
                          <span>{day.minutes} min</span>
                        </div>
                        <Progress value={(day.lessons / 5) * 100} className="h-2" />
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{day.stars}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skill Progress */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-primary" />
                  <span>Skill Development</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {skillProgress.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-gray-900">{skill.skill}</h4>
                        <div className="flex items-center space-x-2">
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              skill.level === 'Not Started' ? 'text-gray-500' :
                              skill.level === 'Beginner' ? 'text-blue-600' :
                              'text-green-600'
                            }`}
                          >
                            {skill.level}
                          </Badge>
                          <span className="text-sm text-gray-600">
                            {skill.completed}/{skill.total} completed
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">{skill.progress}%</div>
                      </div>
                    </div>
                    <Progress value={skill.progress} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Level */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/5 to-accent/5">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">Level 8</h3>
                <p className="text-gray-600 mb-4">Math Explorer</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress to Level 9</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-accent" />
                  <span>Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      achievement.earned 
                        ? 'bg-accent text-white' 
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      <achievement.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-medium text-sm ${
                        achievement.earned ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {achievement.title}
                      </h4>
                      <p className="text-xs text-gray-500 mb-1">{achievement.description}</p>
                      {achievement.earned && achievement.date && (
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span className="text-xs text-green-600">
                            Earned {new Date(achievement.date).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Learning Streak */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span>Learning Streak</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">5</div>
                <div className="text-sm text-gray-600 mb-4">Days in a row!</div>
                <div className="flex justify-center space-x-1">
                  {[...Array(7)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-6 h-6 rounded-full ${
                        i < 5 ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">Keep it up!</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-8">
          <Button onClick={() => navigate('/dashboard')} size="lg">
            Continue Learning
          </Button>
          <Button variant="outline" onClick={() => navigate('/parent')} size="lg">
            Share with Parents
          </Button>
        </div>
      </div>
    </div>
  )
}