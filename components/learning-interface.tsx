"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Pause, SkipForward, CheckCircle, Clock, BookOpen, Menu, X } from "lucide-react"
import Link from "next/link"
import { updateLessonProgress } from "@/lib/course-actions"

interface LearningInterfaceProps {
  course: any
  lessons: any[]
  currentLesson: any
  completedLessons: string[]
  enrollment: any
  user: any
}

export default function LearningInterface({
  course,
  lessons,
  currentLesson,
  completedLessons,
  enrollment,
  user,
}: LearningInterfaceProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const currentLessonIndex = lessons.findIndex((lesson) => lesson.id === currentLesson.id)
  const nextLesson = lessons[currentLessonIndex + 1]
  const isCurrentLessonCompleted = completedLessons.includes(currentLesson.id)

  const handleMarkComplete = async () => {
    try {
      await updateLessonProgress(currentLesson.id, user.id, currentLesson.duration_minutes * 60)
      window.location.reload()
    } catch (error) {
      console.error("Failed to mark lesson as complete:", error)
    }
  }

  const handleNextLesson = () => {
    if (nextLesson) {
      window.location.href = `/learn/${course.id}?lesson=${nextLesson.id}`
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-80 bg-card border-r border-border transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div>
            <h2 className="font-heading text-lg font-semibold text-card-foreground line-clamp-1">{course.title}</h2>
            <p className="text-sm text-muted-foreground">
              {completedLessons.length} of {lessons.length} lessons completed
            </p>
          </div>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-4">
          <Progress value={enrollment.progress_percentage} className="h-2 mb-4" />
          <p className="text-sm text-muted-foreground text-center">{enrollment.progress_percentage}% Complete</p>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="space-y-1 p-2">
            {lessons.map((lesson, index) => {
              const isCompleted = completedLessons.includes(lesson.id)
              const isCurrent = lesson.id === currentLesson.id

              return (
                <Link
                  key={lesson.id}
                  href={`/learn/${course.id}?lesson=${lesson.id}`}
                  className={`block p-3 rounded-lg transition-colors ${
                    isCurrent ? "bg-primary/10 border border-primary/20" : "hover:bg-muted/50 border border-transparent"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {isCompleted ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            isCurrent ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground"
                          }`}
                        >
                          <span className="text-xs font-medium">{index + 1}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4
                        className={`font-medium text-sm line-clamp-2 ${
                          isCurrent ? "text-primary" : "text-card-foreground"
                        }`}
                      >
                        {lesson.title}
                      </h4>
                      <div className="flex items-center mt-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {lesson.duration_minutes}m
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Header */}
        <header className="bg-background border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="font-heading text-xl font-semibold text-foreground">{currentLesson.title}</h1>
                <p className="text-sm text-muted-foreground">
                  Lesson {currentLessonIndex + 1} of {lessons.length}
                </p>
              </div>
            </div>
            <Link href={`/course/${course.id}`}>
              <Button variant="outline">
                <BookOpen className="h-4 w-4 mr-2" />
                Course Details
              </Button>
            </Link>
          </div>
        </header>

        {/* Video Player */}
        <div className="aspect-video bg-black relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                {isPlaying ? (
                  <Pause className="h-8 w-8" />
                ) : (
                  <div className="w-0 h-0 border-l-[16px] border-l-white border-y-[12px] border-y-transparent ml-1"></div>
                )}
              </div>
              <p className="text-lg font-medium">Video Player</p>
              <p className="text-sm opacity-75">
                {currentLesson.duration_minutes} minutes • Low-bandwidth optimized (480p)
              </p>
              <Button className="mt-4" onClick={() => setIsPlaying(!isPlaying)} variant="secondary">
                {isPlaying ? "Pause" : "Play"} Video
              </Button>
            </div>
          </div>
        </div>

        {/* Lesson Content */}
        <div className="p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading text-2xl font-bold text-foreground">{currentLesson.title}</h2>
                <Badge variant={isCurrentLessonCompleted ? "default" : "secondary"}>
                  {isCurrentLessonCompleted ? "Completed" : "In Progress"}
                </Badge>
              </div>
              <p className="text-muted-foreground leading-relaxed">{currentLesson.description}</p>
            </div>

            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="font-heading text-lg font-semibold text-card-foreground mb-4">Lesson Resources</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <span className="text-sm font-medium text-foreground">Lesson Notes (PDF)</span>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <span className="text-sm font-medium text-foreground">Practice Exercises</span>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center justify-between pt-6 border-t border-border">
              <div>
                {!isCurrentLessonCompleted && (
                  <Button onClick={handleMarkComplete} className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark as Complete
                  </Button>
                )}
              </div>
              <div className="flex items-center space-x-4">
                {nextLesson && (
                  <Button onClick={handleNextLesson} className="bg-primary hover:bg-primary/90">
                    Next Lesson
                    <SkipForward className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
