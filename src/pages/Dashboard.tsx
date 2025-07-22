import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Play, 
  Mic, 
  Brain, 
  Trophy, 
  Star,
  Plus,
  Calculator,
  Target,
  Clock,
  Award,
  Volume2,
  Home,
  User
} from 'lucide-react'

export default function Dashboard() {
  const navigate = useNavigate()
  const [selectedLevel, setSelectedLevel] = useState('Grade 2')

  const levels = ['Preschool', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6']
  
  const activities = [
    {
      id: 1,
      title: 'Addition Adventures',
      description: 'Learn addition with fun voice challenges',
      difficulty: 'Easy',
      duration: '10 min',
      progress: 75,
      stars: 3,
      icon: Plus,
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 2,
      title: 'Counting Quest',
      description: 'Count objects and speak your answers',
      difficulty: 'Easy',
      duration: '8 min',
      progress: 100,
      stars: 3,
      icon: Target,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 3,
      title: 'Shape Detective',
      description: 'Identify shapes through voice interaction',
      difficulty: 'Medium',
      duration: '12 min',
      progress: 45,
      stars: 2,
      icon: Brain,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      id: 4,
      title: 'Number Patterns',
      description: 'Discover patterns in numbers',
      difficulty: 'Medium',
      duration: '15 min',
      progress: 0,
      stars: 0,
      icon: Calculator,
      color: 'bg-orange-100 text-orange-600'
    }
  ]

  const achievements = [
    { title: 'First Steps', description: 'Completed first lesson', earned: true },
    { title: 'Voice Master', description: 'Used voice interaction 10 times', earned: true },
    { title: 'Quick Learner', description: 'Completed 5 lessons in a day', earned: false },
    { title: 'Math Wizard', description: 'Perfect score on 3 lessons', earned: false }
  ]

  const handleStartActivity = (activityId: number) => {
    navigate('/learn', { state: { activityId } })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-amber-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">Learning Dashboard</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/progress')}>
                <Trophy className="w-4 h-4 mr-2" />
                Progress
              </Button>
              <Button variant="ghost" size="sm">
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome back, Emma! 🌟</h1>
                <p className="text-lg opacity-90">Ready for another fun learning adventure?</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">Level 8</div>
                <div className="text-sm opacity-90">Math Explorer</div>
              </div>
            </div>
          </div>
        </div>

        {/* Level Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Choose Your Level</h2>
          <div className="flex flex-wrap gap-2">
            {levels.map((level) => (
              <Button
                key={level}
                variant={selectedLevel === level ? "default" : "outline"}
                onClick={() => setSelectedLevel(level)}
                className="rounded-full"
              >
                {level}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Activities */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Today's Activities</h2>
              <Badge className="bg-accent/10 text-accent-foreground">
                {selectedLevel}
              </Badge>
            </div>

            <div className="grid gap-6">
              {activities.map((activity) => (
                <Card key={activity.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${activity.color}`}>
                          <activity.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{activity.title}</h3>
                          <p className="text-gray-600 mb-3">{activity.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{activity.duration}</span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {activity.difficulty}
                            </Badge>
                            <div className="flex items-center space-x-1">
                              {[...Array(3)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-4 h-4 ${i < activity.stars ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button 
                        onClick={() => handleStartActivity(activity.id)}
                        className="bg-primary hover:bg-primary/90 group-hover:scale-105 transition-transform"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        {activity.progress > 0 ? 'Continue' : 'Start'}
                      </Button>
                    </div>
                    
                    {activity.progress > 0 && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium text-gray-900">{activity.progress}%</span>
                        </div>
                        <Progress value={activity.progress} className="h-2" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-accent" />
                  <span>Today's Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">3</div>
                  <div className="text-sm text-gray-600">Lessons Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">25</div>
                  <div className="text-sm text-gray-600">Minutes Learned</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">8</div>
                  <div className="text-sm text-gray-600">Stars Earned</div>
                </div>
              </CardContent>
            </Card>

            {/* Voice Interaction */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/5 to-accent/5">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mic className="w-5 h-5 text-primary" />
                  <span>Voice Practice</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm">
                  Practice speaking your answers! Our AI listens and helps you learn.
                </p>
                <Button className="w-full" variant="outline">
                  <Volume2 className="w-4 h-4 mr-2" />
                  Try Voice Mode
                </Button>
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
              <CardContent className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      achievement.earned ? 'bg-accent text-white' : 'bg-gray-100 text-gray-400'
                    }`}>
                      <Trophy className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className={`font-medium text-sm ${achievement.earned ? 'text-gray-900' : 'text-gray-500'}`}>
                        {achievement.title}
                      </div>
                      <div className="text-xs text-gray-500">{achievement.description}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}