import { useEffect, useState } from 'react'

export type Appearance = 'system' | 'light' | 'dark'
const key = 'the-archive-reboot:appearance:v1'

function savedAppearance(): Appearance {
  try {
    const value = localStorage.getItem(key)
    return value === 'light' || value === 'dark' ? value : 'system'
  } catch { return 'system' }
}

export function useAppearance() {
  const [appearance, setAppearance] = useState<Appearance>(savedAppearance)
  const [systemDark, setSystemDark] = useState(() => window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false)
  useEffect(() => {
    if (!window.matchMedia) return
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const update = () => setSystemDark(media.matches)
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])
  const set = (value: Appearance) => {
    setAppearance(value)
    try { localStorage.setItem(key, value) } catch { /* Appearance still changes for this session. */ }
  }
  return { appearance, setAppearance: set, theme: appearance === 'system' ? systemDark ? 'dark' : 'light' : appearance }
}
