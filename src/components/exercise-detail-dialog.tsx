'use client'

import { Exercise } from '@/types/exercise'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import { Dumbbell } from 'lucide-react'

interface ExerciseDetailDialogProps {
  exercise: Exercise | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ExerciseDetailDialog({
  exercise,
  open,
  onOpenChange,
}: ExerciseDetailDialogProps) {
  if (!exercise) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-['Consolas',monospace]">
            {exercise.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Exercise GIF/Image */}
          <div className="aspect-video relative rounded-lg bg-muted/30 overflow-hidden">
            {exercise.gifUrl ? (
              <Image
                src={exercise.gifUrl}
                alt={exercise.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Dumbbell className="h-16 w-16 text-muted-foreground/30" />
              </div>
            )}
          </div>

          <Separator />

          {/* Exercise Info */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-sm px-3 py-1">
                {exercise.muscleGroup}
              </Badge>
              {exercise.sets && exercise.reps && (
                <Badge variant="outline" className="text-sm px-3 py-1">
                  {exercise.sets} sets × {exercise.reps} reps
                </Badge>
              )}
            </div>

            {exercise.description && (
              <div>
                <h4 className="font-semibold mb-2 text-sm uppercase tracking-wide text-muted-foreground">
                  Description
                </h4>
                <p className="text-sm leading-relaxed">{exercise.description}</p>
              </div>
            )}

            <div>
              <h4 className="font-semibold mb-2 text-sm uppercase tracking-wide text-muted-foreground">
                Workout Day
              </h4>
              <p className="text-sm">{exercise.workoutDay?.name}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
