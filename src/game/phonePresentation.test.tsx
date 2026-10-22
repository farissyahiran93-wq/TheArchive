import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { newGame, type GameSave } from './types'
import { openingPresence, phoneNotices } from './phonePresentation'
import { PhoneNotifications } from '../ui/PhoneNotifications'
import { ChatPhotoViewer } from '../ui/ChatPhotoViewer'

afterEach(cleanup)
function incoming(): GameSave {
  return { ...newGame(), prologue: { dialogueVersion: 4, stage: 'chat', step: 0, messages: [{ id: 'one', sender: 'sophie', text: 'Hello.' }, { id: 'two', sender: 'player', text: 'Hi.' }], noteSeen: false, offerInspected: false, restored: false, viewed: [], indexCompared: false, v4Beat: 'question' } }
}
describe('phone presentation', () => {
  it('projects only received messages without changing story state or replaying teaser media', () => {
    const save = incoming()
    save.prologue!.messages.push({ id: 'OPEN-V4-FIRST-PAGE', sender: 'sophie', text: 'Older teaser' })
    const before = JSON.stringify(save)
    expect(phoneNotices(save).map(item => item.id)).toEqual(['one'])
    expect(JSON.stringify(save)).toBe(before)
    expect(openingPresence(save, 'sophie')).toBe('online')
    save.prologue!.v4Beat = 'waiting-group'
    expect(openingPresence(save, 'sophie')).toBe('offline')
  })
  it('notifies a delivered group message with its recipient thread and sender avatar', () => {
    const save = incoming()
    save.prologue!.social = { phase: 'first', members: ['maya','player'], messages: [{ id: 'group-one', sender: 'maya', text: 'Who is this?' }] }
    expect(phoneNotices(save).find(item => item.id === 'group-one')).toEqual({ id: 'group-one', title: 'FIND DANIEL', text: 'Maya Chen: Who is this?', thread: 'group', avatar: 'maya' })
  })
  it('does not replay saved messages and dismissing a new banner preserves unread knowledge', () => {
    const save = incoming(), open = vi.fn()
    const view = render(<PhoneNotifications save={save} onOpen={open}/>)
    expect(screen.queryByLabelText('Incoming notification')).toBeNull()
    const next = { ...save, prologue: { ...save.prologue!, messages: [...save.prologue!.messages, { id: 'new', sender: 'sophie' as const, text: 'Are you there?' }] } }
    view.rerender(<PhoneNotifications save={next} onOpen={open}/>)
    expect(screen.getByText('Are you there?')).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss notification' }))
    expect(screen.queryByLabelText('Incoming notification')).toBeNull()
    expect(open).not.toHaveBeenCalled()
    expect(next.knowledge.characters.sophie).toEqual([])
  })
  it('opens a full image with explicit zoom and a close control', () => {
    const close = vi.fn()
    render(<ChatPhotoViewer src="/daniel-note.svg" alt="Handwritten note from Sophie" onClose={close}/>)
    fireEvent.click(screen.getByRole('button', { name: 'Zoom in' }))
    expect(screen.getByAltText('Handwritten note from Sophie').getAttribute('style')).toContain('scale(1.5)')
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' })
    expect(close).toHaveBeenCalledOnce()
  })
})
