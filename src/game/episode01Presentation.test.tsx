import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { StageThread } from '../ui/Phase03bScenes'
import { UtilityApp } from '../ui/UtilityApps'
import { CaseNavigation } from '../ui/CaseNavigation'
import { useGameStore } from './store'
import { newGame } from './types'
import { beginScene01 } from './scene01'
import { CharacterFollowupChat } from '../ui/CharacterFollowupChat'

const original = useGameStore.getState()
afterEach(() => { cleanup(); useGameStore.setState(original) })
describe('Episode 01 private framing/share presentation', () => {
  function retainedLucas() {
    const save = beginScene01(newGame(), 1000)
    save.knowledge.player.push('K01')
    save.deliveredEvents.push('ARC-E01-MAYA-REFERRAL', 'ARC-E01-LUCAS-REPLY')
    save.prologue!.social = { phase: 'done', members: ['player','sophie','maya'], messages: [{ id: 'old-lucas-group', sender: 'lucas', text: 'Earlier group message.' }] }
    save.prologue!.scene01!.groupMembers = { sophie: true, maya: true, lucas: false }
    save.prologue!.scene01!.lucasLeftGroup = true
    save.messages.push({ id: 'ARC-E01-LUCAS-REPLY', sender: 'lucas', text: 'Saved private conversation.', at: 1, delivery: 'read' }, { id: 'OPEN-S02-C01-PLAYER-a-TO-lucas', sender: 'player', recipient: 'lucas', text: 'Earlier group reply.', at: 2, delivery: 'delivered' })
    return save
  }
  it('keeps an already unlocked Lucas contact accessible after the new group departure', () => {
    const save = retainedLucas(), openCharacter = vi.fn()
    useGameStore.setState({ save })
    const props = { app: 'contacts' as const, back: vi.fn(), appearance: 'light' as const, setAppearance: vi.fn(), audio: { effects: false, music: false }, setAudio: vi.fn(), onRestart: vi.fn() }
    render(<CaseNavigation.Provider value={{ openMaya: vi.fn(), openSophie: vi.fn(), openCharacter, openBulletin: vi.fn(), openArchive: vi.fn(), openGroup: vi.fn() }}><UtilityApp {...props}/></CaseNavigation.Provider>)
    fireEvent.click(screen.getByRole('button', { name: /Lucas Grey/ }))
    expect(openCharacter).toHaveBeenCalledWith('lucas')
    expect(useGameStore.getState().save).toBe(save)
  })
  it('retains Lucas private history without new legacy dialogue, typing or group-receipt lines', () => {
    const save = retainedLucas()
    save.pendingEvents.push({ id: 'ARC-E01-LUCAS-ANSWER', dueAt: 5000 })
    useGameStore.setState({ save })
    render(<CharacterFollowupChat contact="lucas" readOnly onBack={vi.fn()}/>)
    expect(screen.getByText('Saved private conversation.')).toBeTruthy()
    expect(screen.queryByText('Earlier group reply.')).toBeNull()
    expect(screen.queryByRole('button', { name: /Send/ })).toBeNull()
    expect(screen.queryByRole('status')).toBeNull()
    expect(useGameStore.getState().save).toBe(save)
  })
  it('keeps legacy Bulletin evidence out of player Photos', () => {
    const base = newGame()
    useGameStore.setState({ save: base })
    const props = { app: 'photos' as const, back: vi.fn(), appearance: 'light' as const, setAppearance: vi.fn(), audio: { effects: false, music: false }, setAudio: vi.fn(), onRestart: vi.fn() }
    const view = render(<UtilityApp {...props}/> )
    expect(screen.getByAltText('Greyhaven canal wallpaper')).toBeTruthy()
    expect(screen.queryByAltText('Older public Bus 4 record crop')).toBeNull()
    act(() => useGameStore.setState({ save: { ...base, evidence: { E001: { id: 'E001', source: 'Older public preview', collectedAt: 1, verified: false } } } }))
    expect(screen.queryByAltText('Older public Bus 4 record crop')).toBeNull()
    expect(screen.queryByText('Greyhaven Bulletin')).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: 'Open wallpaper' }))
    expect(screen.getByRole('dialog', { name: 'Photo viewer' })).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'Zoom in' }))
    fireEvent.click(screen.getByRole('button', { name: 'Close photo' }))
    view.unmount()
  })
  it('opens the accepted Messages channel without rendering its private replies in Bulletin or changing the save', () => {
    const base = newGame()
    const save = { ...base, deliveredEvents: ['CONN-E01-01'], messages: [{ id: 'EV-E01-P03B:S25_OPEN:0', sender: 'maya' as const, channel: 'messages' as const, text: 'Private check-in', at: 1, delivery: 'delivered' as const }] }
    useGameStore.setState({ save })
    const openMaya = vi.fn()
    render(<CaseNavigation.Provider value={{ openMaya, openSophie: vi.fn(), openCharacter: vi.fn(), openBulletin: vi.fn(), openArchive: vi.fn(), openGroup: vi.fn() }}><StageThread stage="25"/></CaseNavigation.Provider>)
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
