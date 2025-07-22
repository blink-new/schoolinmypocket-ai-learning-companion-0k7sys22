import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ArrowLeft,
  User,
  Calendar,
  Clock,
  Trophy,
  Star,
  TrendingUp,
  Brain,
  Target,
  Heart,
  Download,
  Mail,
  Settings,
  BarChart3,
  BookOpen,
  Award,
  Zap
} from 'lucide-react'

export default function ParentPortal() {
  const navigate = useNavigate()
  const [selectedChild, setSelectedChild] = useState('Emma')

  const children = [
    { name: 'Emma', age: 7, grade: 'Grade 2', avatar: '👧' },
    { name: 'Max', age: 5, grade: 'Kindergarten', avatar: '👦' }
  ]

  const weeklyData = [
    { week: 'Week 1', lessons: 12, minutes: 95, accuracy: 85, stars: 28 },
    { week: 'Week 2', lessons: 15, minutes: 120, accuracy: 88, stars: 35 },
    { week: 'Week 3', lessons: 18, minutes: 140, accuracy: 92, stars: 42 },
    { week: 'Week 4', lessons: 20, minutes: 160, accuracy: 94, stars: 48 }
  ]

  const skillAreas = [
    { 
      skill: 'Addition', 
      level: 'Intermediate', 
      progress: 85, 
      lastActivity: '2 hours ago',
      strengths: ['Single digit addition', 'Adding with objects'],
      improvements: ['Double digit addition', 'Word problems']
    },
    { 
      skill: 'Counting', 
      level: 'Advanced', 
      progress: 95, 
      lastActivity: '1 day ago',
      strengths: ['Counting to 100', 'Skip counting'],
      improvements: ['Counting backwards']
    },
    { 
      skill: 'Shapes', 
      level: 'Beginner', 
      progress: 60, 
      lastActivity: '3 hours ago',
      strengths: ['Basic shapes', 'Shape recognition'],
      improvements: ['3D shapes', 'Shape properties']
    },
    { 
      skill: 'Patterns', 
      level: 'Beginner', 
      progress: 45, 
      lastActivity: '2 days ago',
      strengths: ['Simple patterns'],
      improvements: ['Complex patterns', 'Number patterns']
    }
  ]

  const recentActivities = [
    {
      date: '2024-01-21',
      time: '4:30 PM',
      activity: 'Addition Adventures',
      duration: '12 minutes',
      score: '8/10',
      stars: 3,
      feedback: 'Great improvement in mental math!'
    },
    {
      date: '2024-01-21',
      time: '3:15 PM',
      activity: 'Shape Detective',
      duration: '8 minutes',
      score: '6/8',
      stars: 2,
      feedback: 'Good work identifying triangles and circles.'
    },
    {
      date: '2024-01-20',
      time: '5:00 PM',
      activity: 'Counting Quest',
      duration: '10 minutes',
      score: '10/10',
      stars: 3,
      feedback: 'Perfect score! Excellent counting skills.'
    }
  ]

  const insights = [
    {
      type: 'strength',
      title: 'Voice Interaction Mastery',
      description: 'Emma shows excellent engagement with voice-based learning, with 95% successful voice interactions.',
      icon: Brain,
      color: 'text-green-600 bg-green-100'
    },
    {
      type: 'improvement',
      title: 'Focus on Word Problems',
      description: 'Consider introducing more word problems to strengthen application of math concepts.',
      icon: Target,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      type: 'achievement',
      title: 'Consistent Learning Habit',
      description: 'Emma has maintained a 5-day learning streak, showing great dedication!',
      icon: Trophy,
      color: 'text-yellow-600 bg-yellow-100'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-amber-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Parent Portal</h1>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Child Selection */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Child</h2>
          <div className="flex space-x-4">
            {children.map((child) => (
              <Card 
                key={child.name}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedChild === child.name 
                    ? 'ring-2 ring-primary shadow-lg' 
                    : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedChild(child.name)}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2">{child.avatar}</div>
                  <h3 className="font-semibold text-gray-900">{child.name}</h3>
                  <p className="text-sm text-gray-600">{child.grade}</p>
                  <p className="text-xs text-gray-500">Age {child.age}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">65</div>
                  <div className="text-sm text-gray-600">Total Lessons</div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-6 h-6 text-accent" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">8.5</div>
                  <div className="text-sm text-gray-600">Hours This Month</div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">89%</div>
                  <div className="text-sm text-gray-600">Average Accuracy</div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Star className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">153</div>
                  <div className="text-sm text-gray-600">Stars Earned</div>
                </CardContent>
              </Card>
            </div>

            {/* Current Level & Achievements */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-primary" />
                    <span>Current Level</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Trophy className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">Level 8</h3>
                    <p className="text-gray-600 mb-4">Math Explorer</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress to Level 9</span>
                        <span>75%</span>
                      </div>
                      <Progress value={75} className="h-3" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-accent" />
                    <span>Recent Achievements</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <Zap className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Quick Learner</h4>
                      <p className="text-sm text-gray-600">Completed 5 lessons in one day</p>
                      <p className="text-xs text-green-600">Earned yesterday</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Brain className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Voice Master</h4>
                      <p className="text-sm text-gray-600">Used voice interaction 10 times</p>
                      <p className="text-xs text-blue-600">Earned 3 days ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            {/* Weekly Progress Chart */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <span>Weekly Progress Trends</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {weeklyData.map((week, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-gray-900">{week.week}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{week.lessons} lessons</span>
                          <span>{week.minutes} min</span>
                          <span>{week.accuracy}% accuracy</span>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span>{week.stars}</span>
                          </div>
                        </div>
                      </div>
                      <Progress value={week.accuracy} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skill Areas */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-primary" />
                  <span>Skill Development</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {skillAreas.map((skill, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">{skill.skill}</h4>
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {skill.level}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            Last activity: {skill.lastActivity}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">{skill.progress}%</div>
                      </div>
                    </div>
                    <Progress value={skill.progress} className="h-2" />
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h5 className="font-medium text-green-700 mb-1">Strengths:</h5>
                        <ul className="text-gray-600 space-y-1">
                          {skill.strengths.map((strength, i) => (
                            <li key={i} className="flex items-center space-x-1">
                              <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                              <span>{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-blue-700 mb-1">Areas to improve:</h5>
                        <ul className="text-gray-600 space-y-1">
                          {skill.improvements.map((improvement, i) => (
                            <li key={i} className="flex items-center space-x-1">
                              <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                              <span>{improvement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activities Tab */}
          <TabsContent value="activities" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span>Recent Learning Activities</span>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">{activity.activity}</h4>
                          <p className="text-sm text-gray-600">
                            {activity.date} at {activity.time}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1 mb-1">
                            {[...Array(activity.stars)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <Badge variant="outline">{activity.score}</Badge>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                        <span>Duration: {activity.duration}</span>
                      </div>
                      <p className="text-sm text-gray-700 bg-gray-50 rounded p-2">
                        💬 {activity.feedback}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span>Learning Insights & Recommendations</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {insights.map((insight, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-lg border">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${insight.color}`}>
                      <insight.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">{insight.title}</h4>
                      <p className="text-gray-600">{insight.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Personalized Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-2">📚 Suggested Learning Path</h4>
                  <p className="text-blue-800 text-sm">
                    Based on Emma's progress, we recommend focusing on double-digit addition next. 
                    She's ready for this challenge and it will build on her strong foundation.
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-900 mb-2">⏰ Optimal Learning Time</h4>
                  <p className="text-green-800 text-sm">
                    Emma shows highest engagement between 4-6 PM. Consider scheduling 
                    learning sessions during this time for best results.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-medium text-purple-900 mb-2">🎯 Weekly Goal</h4>
                  <p className="text-purple-800 text-sm">
                    Aim for 15-20 minutes of practice daily. Emma is currently averaging 
                    18 minutes, which is perfect for her age and attention span.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}