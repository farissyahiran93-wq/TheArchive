import { useEffect, useRef, useState } from 'react'

export type AudioPreferences = { effects: boolean; music: boolean; master?: boolean; musicVolume?: number; effectsVolume?: number }
const key = 'the-archive-reboot:audio:v1'

function readPreferences(): AudioPreferences {
  try {
    const value = JSON.parse(localStorage.getItem(key) ?? '{}') as Partial<AudioPreferences>
    return { effects: value.effects !== false, music: value.music !== false, master: value.master !== false, musicVolume: typeof value.musicVolume === 'number' ? Math.max(0,Math.min(1,value.musicVolume)) : 1, effectsVolume: typeof value.effectsVolume === 'number' ? Math.max(0,Math.min(1,value.effectsVolume)) : 1 }
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

  activate(music: boolean, volume = 1) {
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
    this.setMusic(music, volume)
  }

  setMusic(enabled: boolean, volume = 1) {
    if (!this.context || !this.musicGain) return
    this.musicGain.gain.setTargetAtTime(enabled ? 0.008 * volume : 0, this.context.currentTime, 0.08)
  }

  notify(volume = 1) {
    if (!this.enabled || !this.context || this.context.state !== 'running') return
    const start = this.context.currentTime
    const tone = this.context.createOscillator()
    const gain = this.context.createGain()
    tone.type = 'sine'
    tone.frequency.setValueAtTime(740, start)
    tone.frequency.exponentialRampToValueAtTime(980, start + 0.13)
    gain.gain.setValueAtTime(0.0001, start)
    gain.gain.exponentialRampToValueAtTime(Math.max(0.0001,0.045 * volume), start + 0.015)
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
  const musicEnabled = useRef(preferences.master !== false && preferences.music)
  const volume = useRef(preferences.musicVolume ?? 1)
  useEffect(()=>{volume.current=preferences.musicVolume??1},[preferences.musicVolume])
  useEffect(() => { musicEnabled.current = preferences.master !== false && preferences.music }, [preferences.music, preferences.master])
  useEffect(() => {
    const audio = new PhoneAudio()
    engine.current = audio
    const unlock = () => { try { audio.activate(musicEnabled.current,volume.current) } catch { /* Audio unavailable on this device. */ } }
    window.addEventListener('pointerdown', unlock, { once: true })
    window.addEventListener('keydown', unlock, { once: true })
    return () => { window.removeEventListener('pointerdown', unlock); window.removeEventListener('keydown', unlock); audio.dispose(); engine.current = null }
  }, [])
  useEffect(() => { engine.current?.setMusic(preferences.master !== false && preferences.music, preferences.musicVolume ?? 1) }, [preferences.music, preferences.master, preferences.musicVolume])
  useEffect(() => {
    if (!ready) return
    if (known.current === null) { known.current = new Set(notifications.map(item => item.id)); return }
    const incoming = notifications.some(item => !known.current!.has(item.id))
    known.current = new Set(notifications.map(item => item.id))
    if (incoming && preferences.effects && preferences.master !== false) engine.current?.notify(preferences.effectsVolume ?? 1)
  }, [notifications, ready, preferences.effects, preferences.master, preferences.effectsVolume])
}
