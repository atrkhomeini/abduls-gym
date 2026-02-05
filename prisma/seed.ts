import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create workout days
  const day1 = await prisma.workoutDay.upsert({
    where: { id: 'day-1' },
    update: {},
    create: {
      id: 'day-1',
      name: 'Day 1: Back + Legs',
      order: 1,
      description: 'Focus on back and leg muscles',
    },
  })

  const day2 = await prisma.workoutDay.upsert({
    where: { id: 'day-2' },
    update: {},
    create: {
      id: 'day-2',
      name: 'Day 2: Chest',
      order: 2,
      description: 'Focus on chest muscles',
    },
  })

  const day3 = await prisma.workoutDay.upsert({
    where: { id: 'day-3' },
    update: {},
    create: {
      id: 'day-3',
      name: 'Day 3: Rest',
      order: 3,
      description: 'Rest and recovery day',
    },
  })

  const day4 = await prisma.workoutDay.upsert({
    where: { id: 'day-4' },
    update: {},
    create: {
      id: 'day-4',
      name: 'Day 4: Shoulder',
      order: 4,
      description: 'Focus on shoulder muscles',
    },
  })

  const day5 = await prisma.workoutDay.upsert({
    where: { id: 'day-5' },
    update: {},
    create: {
      id: 'day-5',
      name: 'Day 5: Rest',
      order: 5,
      description: 'Rest and recovery day',
    },
  })

  // Clear existing exercises
  await prisma.exercise.deleteMany({})

  // Create exercises for Day 1: Back + Legs
  await prisma.exercise.createMany({
    data: [
      {
        name: 'Lat Pulldown',
        muscleGroup: 'Back',
        gifUrl: '/assets/lat-pulldown.gif',
        description: 'Pull the bar down towards your chest, squeezing your shoulder blades together.',
        sets: 2,
        reps: 20,
        workoutDayId: day1.id,
      },
      {
        name: 'Rowing',
        muscleGroup: 'Back',
        gifUrl: '/assets/rowing.gif',
        description: 'Pull the weight towards your body, keeping your back straight and squeezing your shoulder blades.',
        sets: 2,
        reps: 20,
        workoutDayId: day1.id,
      },
      {
        name: 'Back-up Machine',
        muscleGroup: 'Back',
        gifUrl: '/assets/back-up-machine.gif',
        description: 'Pull the weight down while keeping your form controlled.',
        sets: 3,
        reps: 15,
        workoutDayId: day1.id,
      },
      {
        name: 'Barbell Squat',
        muscleGroup: 'Legs',
        gifUrl: '/assets/barbell-squat.gif',
        description: 'Squat down while keeping your back straight and chest up, then push through your heels.',
        sets: 3,
        reps: 10,
        workoutDayId: day1.id,
      },
      {
        name: 'Hack Squat (Alternative)',
        muscleGroup: 'Legs',
        gifUrl: '/assets/hack-squat.gif',
        description: 'Alternative to barbell squat. Lower your body and push back up.',
        sets: 4,
        reps: 12,
        workoutDayId: day1.id,
      },
      {
        name: 'Hamstring Curl',
        muscleGroup: 'Legs',
        gifUrl: '/assets/hamstring-curl.gif',
        description: 'Curl the weight up by flexing your hamstrings.',
        sets: 3,
        reps: 15,
        workoutDayId: day1.id,
      },
    ],
  })

  // Create exercises for Day 2: Chest
  await prisma.exercise.createMany({
    data: [
      {
        name: 'Incline Press',
        muscleGroup: 'Chest',
        gifUrl: '/assets/incline-press.gif',
        description: 'Press the weight up at an incline angle to target upper chest.',
        sets: 3,
        reps: 15,
        workoutDayId: day2.id,
      },
      {
        name: 'Chest Fly',
        muscleGroup: 'Chest',
        gifUrl: '/assets/chest-fly.gif',
        description: 'Bring your arms together in an arc motion, squeezing your chest at the top.',
        sets: 3,
        reps: 15,
        workoutDayId: day2.id,
      },
      {
        name: 'Dips',
        muscleGroup: 'Chest',
        gifUrl: '/assets/dips.gif',
        description: 'Lower your body and push back up, focusing on chest engagement.',
        sets: 3,
        reps: 15,
        workoutDayId: day2.id,
      },
    ],
  })

  // Create exercises for Day 4: Shoulder
  await prisma.exercise.createMany({
    data: [
      {
        name: 'Shoulder Press',
        muscleGroup: 'Shoulder',
        gifUrl: '/assets/shoulder-press.gif',
        description: 'Press the weight overhead, keeping your core tight.',
        sets: 4,
        reps: 12,
        workoutDayId: day4.id,
      },
      {
        name: 'Lateral Raise',
        muscleGroup: 'Shoulder',
        gifUrl: '/assets/lateral-raise.gif',
        description: 'Raise your arms to the side until they are parallel to the ground.',
        sets: 4,
        reps: 15,
        workoutDayId: day4.id,
      },
      {
        name: 'Reverse Peck Deck',
        muscleGroup: 'Shoulder',
        gifUrl: '/assets/reverse-peck-deck.gif',
        description: 'Pull your arms backward, squeezing your rear delts.',
        sets: 4,
        reps: 15,
        workoutDayId: day4.id,
      },
      {
        name: 'Dumbbell Rear Delt',
        muscleGroup: 'Shoulder',
        gifUrl: '/assets/dumbbell-rear-delt.gif',
        description: 'Alternative exercise. Raise dumbbells to target rear deltoids.',
        sets: 3,
        reps: 15,
        workoutDayId: day4.id,
      },
    ],
  })

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
