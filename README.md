# 💪 Gym Guide - Personal Workout Planner

A modern, clean personal gym guide application with workout cycles and exercise demonstrations. Built with Next.js, Tailwind CSS, and shadcn/ui.

## ✨ Features

- 🏋️ **Workout Cycles** - Organized 5-day workout routine with rest days
- 📊 **Exercise Cards** - Beautiful card-based exercise display with GIF demonstrations
- 🎯 **Grouped Exercises** - Exercises organized by muscle group within each workout day
- 🌙 **Dark Mode** - Seamless light/dark theme switching
- ⏰ **Live Clock** - Real-time clock in the navbar
- 📱 **Responsive Design** - Mobile-first, responsive layout
- 🎨 **Linear.app-Inspired Design** - Clean, minimal aesthetic with Consolas font

## 🏃 Workout Schedule

- **Day 1**: Back + Legs
- **Day 2**: Chest
- **Day 3**: Rest
- **Day 4**: Shoulder
- **Day 5**: Rest

### Exercises by Muscle Group

**Back:**
- Lat Pulldown
- Rowing
- Back-up Machine

**Legs:**
- Barbell Squat
- Hack Squat (alternative)
- Hamstring Curl

**Chest:**
- Incline Press
- Chest Fly
- Dips

**Shoulder:**
- Shoulder Press
- Lateral Raise
- Reverse Peck Deck
- Dumbbell Rear Delt (alternative)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or Bun
- Git

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd gym-guide

# Install dependencies
bun install

# Set up the database
bun run db:push

# Seed the database with initial workout data
bun run db:seed

# Start the development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application running.

## 📁 Project Structure

```
gym-guide/
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Database seed script
├── src/
│   ├── app/
│   │   ├── api/            # API routes
│   │   │   ├── workouts/   # Workout endpoints
│   │   │   └── exercises/  # Exercise endpoints
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/
│   │   ├── ui/             # shadcn/ui components
│   │   ├── navbar.tsx      # Navigation bar with clock
│   │   ├── exercise-card.tsx
│   │   └── exercise-detail-dialog.tsx
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   └── types/              # TypeScript types
└── assets/                 # Exercise GIFs (to be added)
```

## 🗄️ Database Setup

### Database Schema

The application uses Prisma ORM with SQLite. The schema includes:

- **WorkoutDay**: Represents a workout day with name, order, and description
- **Exercise**: Represents exercises with name, muscle group, GIF URL, sets, reps, and relationships

### Seeding the Database

The database is seeded with all the workout days and exercises by default:

```bash
bun run db:seed
```

To reset and reseed:

```bash
# Reset database
bun run db:reset

# Seed again
bun run db:seed
```

## 🎨 Adding Exercise GIFs

Place your exercise GIF files in the `assets/` directory at the project root:

```
gym-guide/
├── assets/
│   ├── lat-pulldown.gif
│   ├── rowing.gif
│   ├── back-up-machine.gif
│   ├── barbell-squat.gif
│   ├── hack-squat.gif
│   ├── hamstring-curl.gif
│   ├── incline-press.gif
│   ├── chest-fly.gif
│   ├── dips.gif
│   ├── shoulder-press.gif
│   ├── lateral-raise.gif
│   ├── reverse-peck-deck.gif
│   └── dumbbell-rear-delt.gif
```

The application references these GIFs in the database via the `gifUrl` field.

## 🛠️ Development

### Available Scripts

```bash
# Start development server
bun run dev

# Build for production
bun run build

# Run linting
bun run lint

# Database operations
bun run db:push      # Push schema changes to database
bun run db:generate  # Generate Prisma client
bun run db:seed      # Seed database with initial data
bun run db:reset     # Reset database
```

### Working with the API

#### Get All Workouts

```bash
GET /api/workouts
```

Response:
```json
[
  {
    "id": "day-1",
    "name": "Day 1: Back + Legs",
    "order": 1,
    "description": "Focus on back and leg muscles",
    "exercises": [...]
  }
]
```

#### Get Single Exercise

```bash
GET /api/exercises/[id]
```

Response:
```json
{
  "id": "...",
  "name": "Lat Pulldown",
  "muscleGroup": "Back",
  "gifUrl": "/assets/lat-pulldown.gif",
  "description": "...",
  "sets": 4,
  "reps": 12
}
```

## 📝 Customization

### Adding New Exercises

1. Add the GIF to `assets/` directory
2. Update `prisma/seed.ts` with the new exercise data
3. Run `bun run db:seed` to update the database

Or add directly via the database:

```typescript
await prisma.exercise.create({
  data: {
    name: "Your Exercise",
    muscleGroup: "Muscle Group",
    gifUrl: "/assets/your-exercise.gif",
    description: "Exercise description",
    sets: 4,
    reps: 12,
    workoutDayId: "day-1", // or appropriate day ID
  },
})
```

### Modifying Workout Schedule

Edit `prisma/seed.ts` to modify workout days and their order. After changes, run `bun run db:seed` to update.

### Styling

The application uses:
- **Tailwind CSS 4** for styling
- **Consolas** font as the primary font
- **shadcn/ui** components for UI elements

To customize the color scheme, modify the CSS variables in `src/app/globals.css`.

## 🚀 Deployment with Vercel

### Deploying to Vercel

1. **Push your code to GitHub**

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your repository

3. **Configure Environment Variables**
   - Vercel automatically detects Next.js
   - Add `DATABASE_URL` environment variable (use a production database like PostgreSQL for production)

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your application

### Production Database Considerations

For production, consider using:
- PostgreSQL (recommended for production)
- MySQL
- PlanetScale (MySQL-compatible)

Update `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"  # or "mysql"
  url      = env("DATABASE_URL")
}
```

Update `.env` with your production database URL.

### Build Optimization

The build is already optimized for Vercel:
- Static generation where possible
- Edge runtime compatibility
- Image optimization with Next.js Image component
- Automatic code splitting

## 🎯 Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **Database**: Prisma ORM with SQLite (dev) / PostgreSQL (prod)
- **Theme**: next-themes
- **Animations**: Framer Motion

## 🐛 Troubleshooting

### Database Issues

```bash
# Reset database if you encounter issues
bun run db:reset

# Re-seed the database
bun run db:seed
```

### Build Errors

```bash
# Clean and reinstall
rm -rf node_modules .next bun.lockb
bun install
bun run build
```

### Port Already in Use

If port 3000 is already in use, you can change it in `package.json`:

```json
"dev": "next dev -p 3001"
```

## 📄 License

This project is personal and may be used for educational purposes.

## 🤝 Contributing

This is a personal project, but feel free to fork and customize it for your own workout needs!

---

Built with 💪 for fitness enthusiasts. Stay consistent and keep lifting! 🏋️
