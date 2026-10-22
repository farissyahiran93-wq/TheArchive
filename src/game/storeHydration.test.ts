import { expect, it, vi } from 'vitest'
import { useGameStore } from './store'
import { loadGame, stagePendingSave } from './save'
import { newGame } from './types'

vi.mock('./save', async importOriginal => ({
  ...await importOriginal<typeof import('./save')>(),
  loadGame: vi.fn(), writeGame: vi.fn().mockResolvedValue(undefined),
  stagePendingSave: vi.fn(), clearPendingSave: vi.fn(),
}))

it('shares one in-flight load so duplicate startup effects cannot replay a pending save or replace progress twice', async () => {
  const stored = { ...newGame(), player: { name: 'Rae' }, saveRevision: 4 }
  let finish!: (value: { save: typeof stored }) => void
  vi.mocked(loadGame).mockReturnValue(new Promise(resolve => { finish = resolve }))
  useGameStore.setState({ ready: false, recoveryRequired: false })
  const first = useGameStore.getState().hydrate()
  const second = useGameStore.getState().hydrate()
  expect(loadGame).toHaveBeenCalledTimes(1)
  expect(useGameStore.getState().ready).toBe(false)
  finish({ save: stored })
  await Promise.all([first, second])
  expect(useGameStore.getState().ready).toBe(true)
  expect(useGameStore.getState().save.prologue?.scene01?.messages.map(line => line.text)).toEqual(['Hey'])
  expect(useGameStore.getState().save.saveRevision).toBe(5)
  expect(stagePendingSave).toHaveBeenCalledTimes(1)
  await useGameStore.getState().hydrate()
  expect(loadGame).toHaveBeenCalledTimes(1)
})
