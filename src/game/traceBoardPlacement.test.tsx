import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { HomeScreen } from '../ui/HomeScreen'
import { MasterTrace } from '../ui/MasterTrace'
import { beginScene01 } from './scene01'
import { masterScene05Action } from './masterScene05'
import { useGameStore } from './store'
import { newGame } from './types'

const original = useGameStore.getState()
afterEach(() => { cleanup(); useGameStore.setState(original) })

it('keeps the board off the phone home after the starred number is delivered', () => {
  const base = beginScene01({ ...newGame(), masterOpening: true }, 1)
  const scene = base.prologue!.scene01!
  const save = { ...base, prologue: { ...base.prologue!, scene01: { ...scene, messages: [...scene.messages, { id: 'TA-S01-V7-AFTER-06-2', sender: 'sophie' as const, text: 'And a little star beside it.', at: 2 }] } } }
  useGameStore.setState({ save })
  render(<HomeScreen name="Alex" open={vi.fn()} unread={0} archiveUnlocked={false} bulletinEnabled={false} scene01Mode onLock={vi.fn()}/>)
  expect(screen.queryByRole('button', { name: /open investigation board/i })).toBeNull()
  expect(screen.queryByRole('button', { name: /open case board/i })).toBeNull()
})

it('opens the same board inside installed TRACE and returns to TRACE', () => {
  const initial = { ...newGame(), masterScene04: { version: 1 as const, revision: 'v5' as const, opened: true, beat: 10, messages: [], status: 'accepted' as const, inspected: true, complete: true, preview: false, traceInstalled: true } }
  const save = masterScene05Action(initial, { type: 'start' }, 1)
  useGameStore.setState({ save, masterScene05Action: vi.fn() })
  render(<MasterTrace onHome={vi.fn()}/>)
  fireEvent.click(screen.getByRole('button', { name: 'Open Investigation Board' }))
  expect(screen.getByRole('heading', { name: 'Investigation Board' })).toBeTruthy()
  fireEvent.click(screen.getByRole('button', { name: 'Back to TRACE' }))
  expect(screen.getByRole('heading', { name: 'Daniel’s phone archive' })).toBeTruthy()
})
