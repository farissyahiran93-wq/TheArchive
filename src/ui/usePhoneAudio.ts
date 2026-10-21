import { useEffect, useRef, useState } from 'react'

export type AudioPreferences = { effects: boolean; music: boolean }
const key = 'the-archive-reboot:audio:v1'

function readPreferences(): AudioPreferences {
  try {
    const value = JSON.parse(localStorage.getItem(key) ?? '{}') as Partial<AudioPreferences>
    return { effects: value.effects !== false, music: value.music !== false }
  } catch { return { effects: true, music: true } }
}

export function useAudioPreferences() {
  const [preferences, setPreferences] = useState<AudioPreferences>(readPreferences)
  const update = (next: AudioPreferences) => {
    setPreferences(next)
    try { localStorage.setItem(key, JSON.stringify(next)) } catch { /* Session preference still applies. */ }
  }
  return { preferences, setPreferences: update }
}

class PhoneAudio {
  private context: AudioContext | null = null
  private musicGain: GainNode | null = null
  private tones: OscillatorNode[] = []
  private enabled = false

  activate(music: boolean) {
    this.enabled = true
    if (!this.context) {
      this.context = new AudioContext()
      this.musicGain = this.context.createGain()
      this.musicGain.gain.value = 0
      this.musicGain.connect(this.context.destination)
      for (const frequency of [110, 164.81]) {
        const tone = this.context.createOscillator()
        tone.type = 'sine'
        tone.frequency.value = frequency
        tone.connect(this.musicGain)
        tone.start()
        this.tones.push(tone)
      }
    }
    void this.context.resume()
    this.setMusic(music)
  }

  setMusic(enabled: boolean) {
    if (!this.context || !this.musicGain) return
    this.musicGain.gain.setTargetAtTime(enabled ? 0.008 : 0, this.context.currentTime, 0.08)
  }

  notify() {
    if (!this.enabled || !this.context || this.context.state !== 'running') return
    const start = this.context.currentTime
    const tone = this.context.createOscillator()
    const gain = this.context.createGain()
    tone.type = 'sine'
    tone.frequency.setValueAtTime(740, start)
    tone.frequency.exponentialRampToValueAtTime(980, start + 0.13)
    gain.gain.setValueAtTime(0.0001, start)
    gain.gain.exponentialRampToValueAtTime(0.045, start + 0.015)
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.25)
    tone.connect(gain)
    gain.connect(this.context.destination)
    tone.start(start)
    tone.stop(start + 0.26)
    tone.onended = () => { tone.disconnect(); gain.disconnect() }
  }

  dispose() {
    this.tones.forEach(tone => tone.stop())
    this.tones = []
    void this.context?.close()
    this.context = null
    this.enabled = false
  }
}

export function usePhoneAudio(preferences: AudioPreferences, notifications: { id: string }[], ready: boolean) {
  const engine = useRef<PhoneAudio | null>(null)
  const known = useRef<Set<string> | null>(null)
  const musicEnabled = useRef(preferences.music)
  useEffect(() => { musicEnabled.current = preferences.music }, [preferences.music])
  useEffect(() => {
    const audio = new PhoneAudio()
    engine.current = audio
    const unlock = () => { try { audio.activate(musicEnabled.current) } catch { /* Audio unavailable on this device. */ } }
    window.addEventListener('pointerdown', unlock, { once: true })
    window.addEventListener('keydown', unlock, { once: true })
    return () => { window.removeEventListener('pointerdown', unlock); window.removeEventListener('keydown', unlock); audio.dispose(); engine.current = null }
  }, [])
  useEffect(() => { engine.current?.setMusic(preferences.music) }, [preferences.music])
  useEffect(() => {
    if (!ready) return
    if (known.current === null) { known.current = new Set(notifications.map(item => item.id)); return }
    const incoming = notifications.some(item => !known.current!.has(item.id))
    known.current = new Set(notifications.map(item => item.id))
    if (incoming && preferences.effects) engine.current?.notify()
  }, [notifications, ready, preferences.effects])
}
