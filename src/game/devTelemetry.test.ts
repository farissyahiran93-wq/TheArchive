import { afterEach, describe, expect, it, vi } from 'vitest'
import { markDevActivity, readDevTelemetry, recordPuzzleRetry, sampleDevTelemetry } from './devTelemetry'
import { registerPlayer } from './engine'
import { newGame } from './types'

afterEach(() => { vi.useRealTimers(); sessionStorage.clear() })

describe('local development playtest telemetry', () => {
  it('separates active investigation, idle and background time without changing the story save', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-10-17T10:00:00Z'))
    sessionStorage.clear()
    const start = registerPlayer(newGame(),'Rae')
    const save = { ...start, e01: { ...start.e01!, sceneId: 'E01-S23' as const } }
    markDevActivity()
    sampleDevTelemetry(save,'search',true)
    vi.advanceTimersByTime(10_000)
    sampleDevTelemetry(save,'search',true)
    vi.advanceTimersByTime(60_000)
    sampleDevTelemetry(save,'search',true)
    vi.advanceTimersByTime(10_000)
    sampleDevTelemetry(save,'search',false)
    recordPuzzleRetry()
    const metrics = readDevTelemetry()
    expect(metrics?.activeMs).toBe(10_000)
    expect(metrics?.investigationMs).toBe(10_000)
    expect(metrics?.dialogueMs).toBe(0)
    expect(metrics?.idleMs).toBe(60_000)
    expect(metrics?.backgroundMs).toBe(10_000)
    expect(metrics?.puzzleRetries).toBe(1)
    expect(metrics?.elapsedMs).toBe(80_000)
    expect(save.e01?.sceneId).toBe('E01-S23')
  })
})
