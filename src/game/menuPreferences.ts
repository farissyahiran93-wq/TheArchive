export type MenuPreferences = { animatedBackground: boolean; reduceMotion: boolean; typingSpeed: 'slow' | 'normal' | 'fast'; guidance: 'on' | 'minimal' | 'off' }
const key = 'the-archive-reboot:menu-preferences:v1'
export function readMenuPreferences(): MenuPreferences {
  try {
    const p = JSON.parse(localStorage.getItem(key) ?? '{}')
    return { animatedBackground: p.animatedBackground !== false, reduceMotion: p.reduceMotion === true, typingSpeed: p.typingSpeed === 'slow' || p.typingSpeed === 'fast' ? p.typingSpeed : 'normal', guidance: p.guidance === 'off' || p.guidance === 'minimal' ? p.guidance : 'on' }
  } catch { return { animatedBackground: true, reduceMotion: false, typingSpeed: 'normal', guidance: 'on' } }
}
export function writeMenuPreferences(p: MenuPreferences) { try { localStorage.setItem(key, JSON.stringify(p)) } catch { /* Session settings still apply. */ } }
export function typingFactor() { const speed = readMenuPreferences().typingSpeed; return speed === 'slow' ? 1.4 : speed === 'fast' ? .65 : 1 }
