'use client'

import { useEffect } from 'react'
import { useAppStore } from '@/lib/store'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const darkMode = useAppStore((state) => state.darkMode)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  return <>{children}</>
}

