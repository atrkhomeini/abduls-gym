'use client'

import { useState, useEffect } from 'react'
import { Moon, Sun, Dumbbell } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const [time, setTime] = useState('')
  const [mounted, setMounted] = useState(false)

  // Set mounted state when component mounts on client
  useEffect(() => {
    setMounted(true)
  }, [])

  // Update time every second (only after mounted to avoid hydration mismatch)
  useEffect(() => {
    if (!mounted) return

    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }))
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [mounted])

  return (
    <nav className="border-b border-border/40 bg-background/80 backdrop-blur-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Dumbbell className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">Abdul's Gym Guide</span>
          </div>

          {/* Right side - Clock and Theme Toggle */}
          <div className="flex items-center gap-4">
            {/* Clock - only render after client-side mounting */}
            {mounted && time && (
              <div className="text-sm font-mono text-muted-foreground">
                {time}
              </div>
            )}

            {/* Theme Toggle - only render after client-side mounting */}
            {mounted && theme && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="h-9 w-9"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
