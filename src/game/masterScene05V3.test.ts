import { describe, expect, it } from 'vitest'
import { newGame, type GameSave } from './types'
import { masterScene05Action as act } from './masterScene05'
import { scene05V3 } from '../content/masterScene05V3'

const drain = (save: GameSave): GameSave => {
  while (save.masterScene05?.pending) save = act(save, { type:'tick' }, save.masterScene05.pending.dueAt)
  return save
}
describe('Scene 5 v3', () => {
  it('requires a transfer and recovery, delivers branches, and completes after the last bubble', () => {
    let s: GameSave = { ...newGame(), masterScene04: {version:1,revision:'cinematic',opened:true,beat:10,messages:[],status:'accepted',inspected:false,complete:true,preview:false,traceInstalled:true} }
    s = drain(act(s, {type:'start'}, 1000))
    expect(scene05V3).toHaveLength(10)
    for (let n=0; n<10; n++) {
      if(n===4){
        expect(s.masterScene05?.archiveStatus).toBe('offered')
        expect(act(s,{type:'draft',index:0})).toBe(s)
        s=act(s,{type:'archive-accept'},100000)
        s=drain(act(s,{type:'import-tick'},104000))
      }
      if(n===6){
        s=act(s,{type:'open-trace'},200000)
        s=act(s,{type:'recover'},200000)
        s=act(s,{type:'recovery-tick'},208000)
        s=drain(act(s,{type:'recovery-acknowledge'},208001))
        expect(s.masterScene05?.recoveryAnimation?.percent).toBe(20)
      }
      expect(scene05V3[n].choices).toHaveLength(3)
      s=act(s,{type:'draft',index:1})
      s=act(s,{type:'send'},300000+n*10000)
      expect(s.masterScene05?.pending).toBeDefined()
      expect(act(s,{type:'draft',index:0})).toBe(s)
      s=drain(s)
      expect(s.masterScene05?.messages.some(m=>m.text===scene05V3[n].branches[1])).toBe(true)
    }
    expect(s.masterScene05?.complete).toBe(true)
  })
})
