export interface WorkoutDay {
  id: string
  name: string
  order: number
  description: string | null
  exercises: Exercise[]
  createdAt: Date
  updatedAt: Date
}

export interface Exercise {
  id: string
  name: string
  muscleGroup: string
  gifUrl: string | null
  description: string | null
  sets: number | null
  reps: number | null
  workoutDayId: string
  createdAt: Date
  updatedAt: Date
}
