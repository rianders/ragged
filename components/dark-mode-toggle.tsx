'use client'

import { Button } from "@/components/ui/button"
import { useAppStore } from '@/lib/store'
import { Moon, Sun } from 'lucide-react'

export function DarkModeToggle({ className }: { className?: string }) {
  const { darkMode, toggleDarkMode } = useAppStore()

  return (
    <Button variant="outline" size="icon" onClick={toggleDarkMode} className={className}>
      {darkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
      <span className="sr-only">Toggle dark mode</span>
    </Button>
  )
}

