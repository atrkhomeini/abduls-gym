'use client'

import { Exercise } from '@/types/exercise'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dumbbell } from 'lucide-react'
import Image from 'next/image'

interface ExerciseCardProps {
  exercise: Exercise
  onClick: (exercise: Exercise) => void
}

export function ExerciseCard({ exercise, onClick }: ExerciseCardProps) {
  return (
    <Card
      className="group cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg border-border/50 hover:border-primary/50 bg-card/50 hover:bg-card overflow-hidden"
      onClick={() => onClick(exercise)}
    >
      <div className="aspect-square relative bg-muted/30 overflow-hidden">
        {exercise.gifUrl ? (
          <Image
            src={exercise.gifUrl}
            alt={exercise.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Dumbbell className="h-12 w-12 text-muted-foreground/30" />
          </div>
        )}
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-sm leading-tight">{exercise.name}</h3>
        </div>
        <Badge variant="secondary" className="text-xs">
          {exercise.muscleGroup}
        </Badge>
        {exercise.sets && exercise.reps && (
          <p className="text-xs text-muted-foreground">
            {exercise.sets} × {exercise.reps}
          </p>
        )}
      </div>
    </Card>
  )
}
