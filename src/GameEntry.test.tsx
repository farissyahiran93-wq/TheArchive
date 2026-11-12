import { afterEach, expect, it, vi } from 'vitest'
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
const native = vi.hoisted(() => ({ back: undefined as undefined | (() => void), exit: vi.fn(), flush: vi.fn(async () => {}) }))
vi.mock('@capacitor/core', () => ({ Capacitor: { isNativePlatform: () => true } }))
vi.mock('@capacitor/app', () => ({ App: { addListener: (_: string, callback: () => void) => { native.back = callback; return Promise.resolve({ remove: vi.fn() }) }, exitApp: native.exit } }))
vi.mock('./App', () => ({ default: () => <div>Game</div> }))
vi.mock('./ui/MainMenu', () => ({ MainMenu: () => <div>Menu</div> }))
vi.mock('./game/store', () => ({ useGameStore: () => ({ save: {}, ready: true, hydrate: vi.fn() }), flushGameWrites: native.flush, resumeRuntime: vi.fn(), suspendRuntime: vi.fn(), startSceneReplay: vi.fn() }))
import GameEntry from './GameEntry'
afterEach(() => { cleanup(); vi.clearAllMocks(); native.back = undefined })
it('asks before leaving on Android Back and preserves the cancel option', async () => {
  render(<GameEntry/>)
  act(() => native.back?.())
  expect(screen.getByRole('dialog', { name: 'Do you want to leave the game?' })).toBeTruthy()
  fireEvent.click(screen.getByRole('button', { name: 'CANCEL' }))
  expect(screen.queryByRole('dialog')).toBeNull()
  expect(native.exit).not.toHaveBeenCalled()
  act(() => native.back?.())
  fireEvent.click(screen.getByRole('button', { name: 'LEAVE GAME' }))
  await waitFor(() => expect(native.exit).toHaveBeenCalledOnce())
  expect(native.flush).toHaveBeenCalledOnce()
})
