import type { CharacterId } from './types'

const rhythm: Record<CharacterId, number> = { sophie: 1.22, maya: 1, lucas: .8, eli: 1.08, nora: 1.3, daniel: 1.35 }

/** Stable pacing avoids a changed deadline after refresh and keeps each actor recognisable. */
export function npcDeliveryDelay(actor: CharacterId, text: string, sequence = 0, context: 'normal' | 'urgent' | 'reflective' = 'normal'): number {
  const words = text.trim().split(/\s+/u).length
  const base = Math.max(1_500, Math.min(8_500, 1_250 + words * 190))
  const variation = ((sequence * 271 + text.length * 17) % 401) - 200
  const contextFactor = context === 'urgent' ? .78 : context === 'reflective' ? 1.15 : 1
  return Math.max(1_500, Math.min(10_000, Math.round(base * rhythm[actor] * contextFactor + variation)))
}
