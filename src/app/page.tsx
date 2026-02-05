'use client'

import { useState, useEffect } from 'react'
import { WorkoutDay, Exercise } from '@/types/exercise'
import { Navbar } from '@/components/navbar'
import { ExerciseCard } from '@/components/exercise-card'
import { ExerciseDetailDialog } from '@/components/exercise-detail-dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { Dumbbell, Calendar, Clock } from 'lucide-react'
import Image from 'next/image'

// FIXED: Typewriter animation hook
function useTypewriter(texts: string[], period = 3000) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentFullText = texts[currentIndex]
    
    // Determine the speed based on current state
    let typeSpeed = isDeleting ? 50 : 100 + Math.random() * 100

    if (!isDeleting && displayText === currentFullText) {
      // Finished typing the word, pause before deleting
      typeSpeed = period
    } else if (isDeleting && displayText === '') {
      // Finished deleting, small pause before typing next word
      typeSpeed = 500
    }

    const timer = setTimeout(() => {
      if (!isDeleting && displayText === currentFullText) {
        setIsDeleting(true)
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false)
        setCurrentIndex((prev) => (prev + 1) % texts.length)
      } else {
        setDisplayText(currentFullText.substring(0, displayText.length + (isDeleting ? -1 : 1)))
      }
    }, typeSpeed)

    return () => clearTimeout(timer)
  }, [displayText, isDeleting, currentIndex, texts, period])

  return displayText
}

export default function Home() {
  const [workoutDays, setWorkoutDays] = useState<WorkoutDay[]>([])
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  // Typewriter effect for heading
  const headingText = useTypewriter(['Hey Abdul', 'Gym Yuk', 'Jangan Malas Ya'], 3000)

  useEffect(() => {
    fetchWorkouts()
  }, [])

  const fetchWorkouts = async () => {
    try {
      const response = await fetch('/api/workouts')
      if (!response.ok) throw new Error('Failed to fetch workouts')
      const data = await response.json()
      setWorkoutDays(data)
    } catch (error) {
      console.error('Error fetching workouts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleExerciseClick = (exercise: Exercise) => {
    setSelectedExercise(exercise)
    setDialogOpen(true)
  }

  // Group exercises by muscle group within each workout day
  const getGroupedExercises = (exercises: Exercise[]) => {
    const grouped: Record<string, Exercise[]> = {}
    exercises.forEach((exercise) => {
      if (!grouped[exercise.muscleGroup]) {
        grouped[exercise.muscleGroup] = []
      }
      grouped[exercise.muscleGroup].push(exercise)
    })
    return grouped
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Image 
              src="/assets/gyj.png"
              alt="Gym logo"
              width={64}
              height={64}
              className="rounded" 
              />
            <h1 className="text-4xl font-bold font-['Consolas',monospace]">
              {headingText}
              <span className="inline-block w-0.5 h-8 bg-primary ml-1 animate-blink"></span>
            </h1>
          </div>
          <p className="text-muted-foreground text-sm animate-fade-in">
            Fun fact: GYJ loves thick back muscles!
          </p>
        </div>

        {loading ? (
          <div className="space-y-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-8 w-64" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((j) => (
                    <Skeleton key={j} className="h-80" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-12">
            {workoutDays.map((workoutDay) => {
              const groupedExercises = getGroupedExercises(workoutDay.exercises)

              return (
                <section key={workoutDay.id} className="space-y-6">
                  {/* Workout Day Header */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <h2 className="text-2xl font-bold font-['Consolas',monospace]">
                        {workoutDay.name}
                      </h2>
                    </div>
                    {workoutDay.description && (
                      <p className="text-muted-foreground text-sm">
                        {workoutDay.description}
                      </p>
                    )}
                  </div>

                  <Separator />

                  {/* Exercise Groups by Muscle Group */}
                  <div className="space-y-8">
                    {Object.entries(groupedExercises).map(
                      ([muscleGroup, exercises]) => (
                        <div key={muscleGroup} className="space-y-4">
                          <h3 className="text-lg font-semibold text-primary font-['Consolas',monospace] flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {muscleGroup}
                            <span className="text-muted-foreground font-normal">
                              ({exercises.length} exercises)
                            </span>
                          </h3>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {exercises.map((exercise) => (
                              <ExerciseCard
                                key={exercise.id}
                                exercise={exercise}
                                onClick={handleExerciseClick}
                              />
                            ))}
                          </div>
                        </div>
                      )
                    )}
                  </div>

                  <Separator className="opacity-50" />
                </section>
              )
            })}
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border/50 text-center">
          <p className="text-sm text-muted-foreground font-['Consolas',monospace]">
            Built with Next.js, Tailwind CSS, and shadcn/ui
          </p>
        </footer>
      </main>

      {/* Exercise Detail Dialog */}
      <ExerciseDetailDialog
        exercise={selectedExercise}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  )
}