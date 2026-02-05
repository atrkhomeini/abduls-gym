import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const workoutDays = await db.workoutDay.findMany({
      include: {
        exercises: {
          orderBy: {
            id: 'asc',
          },
        },
      },
      orderBy: {
        order: 'asc',
      },
    })

    return NextResponse.json(workoutDays)
  } catch (error) {
    console.error('Error fetching workouts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch workouts' },
      { status: 500 }
    )
  }
}
