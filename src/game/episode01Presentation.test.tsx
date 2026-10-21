import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { StageThread } from '../ui/Phase03bScenes'
import { UtilityApp } from '../ui/UtilityApps'
import { CaseNavigation } from '../ui/CaseNavigation'
import { useGameStore } from './store'
import { newGame } from './types'

const original = useGameStore.getState()
afterEach(() => { cleanup(); useGameStore.setState(original) })
describe('Episode 01 private framing/share presentation', () => {
  it('shows a public photo only after its source was inspected', () => {
    const base = newGame()
    useGameStore.setState({ save: base })
    const props = { app: 'photos' as const, back: vi.fn(), appearance: 'light' as const, setAppearance: vi.fn(), audio: { effects: false, music: false }, setAudio: vi.fn(), onRestart: vi.fn() }
    const view = render(<UtilityApp {...props}/> )
    expect(screen.getByAltText('Greyhaven canal wallpaper')).toBeTruthy()
    expect(screen.queryByAltText('Older public Bus 4 record crop')).toBeNull()
    act(() => useGameStore.setState({ save: { ...base, evidence: { E001: { id: 'E001', source: 'Older public preview', collectedAt: 1, verified: false } } } }))
    expect(screen.getByAltText('Older public Bus 4 record crop')).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: /Greyhaven Bulletin/ }))
    expect(screen.getByRole('dialog', { name: 'Older public Bus 4 preview' })).toBeTruthy()
    view.unmount()
  })
  it('opens the accepted Messages channel without rendering its private replies in Bulletin or changing the save', () => {
    const base = newGame()
    const save = { ...base, deliveredEvents: ['CONN-E01-01'], messages: [{ id: 'EV-E01-P03B:S25_OPEN:0', sender: 'maya' as const, channel: 'messages' as const, text: 'Private check-in', at: 1, delivery: 'delivered' as const }] }
    useGameStore.setState({ save })
    const openMaya = vi.fn()
    render(<CaseNavigation.Provider value={{ openMaya, openSophie: vi.fn(), openCharacter: vi.fn(), openBulletin: vi.fn() }}><StageThread stage="25"/></CaseNavigation.Provider>)
    expect(screen.queryByText('Private check-in')).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: 'Open Maya in Messages' }))
    expect(openMaya).toHaveBeenCalledOnce()
    expect(useGameStore.getState().save).toBe(save)
  })
  it.each([
    ['14', 'EV-E01-P03B:C02-SHARE.A:0'],
    ['26', 'EV-E01-P03B:C03-FRAME.A:0'],
  ] as const)('shows typing for stage %s without changing facts or sending anything', (stage, id) => {
    const save = { ...newGame(), pendingEvents: [{ id, dueAt: 5000 }] }
    useGameStore.setState({ save })
    render(<StageThread stage={stage}/>)
    expect(screen.getByRole('status').textContent).toBe('Maya is replying…')
    expect(useGameStore.getState().save).toBe(save)
    act(() => useGameStore.setState({ save: { ...save, pendingEvents: [] } }))
    expect(screen.queryByRole('status')).toBeNull()
    expect(useGameStore.getState().save.messages).toEqual([])
    expect(useGameStore.getState().save.knowledge.characters.maya).toEqual([])
  })
})
