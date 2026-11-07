import { describe, expect, it } from 'vitest'
import { lucasPhotoBeats } from '../content/lucasPhoto'
import { storyPhotos } from '../content/storyPhotos'
import { beginScene01 } from './scene01'
import { lucasPhotoAction as act } from './lucasPhoto'
import { masterScene08Action } from './masterScene08'
import { newGame, type GameSave } from './types'

describe('Lucas private photo conversation',()=>{
 it('requires Scene 8 and his group departure, then preserves private explicit sends for every option',()=>{
  const empty=newGame()
  expect(act(empty,{type:'start'})).toBe(empty)
  for(let target=0;target<3;target++)for(let option=0;option<3;option++){
   let s=beginScene01({...newGame(),masterOpening:true},1000)
   s={...s,deliveredEvents:[...s.deliveredEvents,'TA-S07-SCENE08-UNLOCKED'],prologue:{...s.prologue!,scene01:{...s.prologue!.scene01!,lucasLeftGroup:true,groupMembers:{sophie:true,maya:true,lucas:false}}},masterScene07:{phase:'complete',saved:true} as GameSave['masterScene07']}
   s=masterScene08Action(s,{type:'start'})
   expect(act(s,{type:'start'})).toBe(s)
   for(let n=0;n<2;n++){s=masterScene08Action(s,{type:'draft',index:0});s=masterScene08Action(s,{type:'send'})}
   s=act(s,{type:'start'})
   for(let n=0;n<3;n++){
    const selected=n===target?option:0,count=s.lucasPhoto!.messages.length
    s=act(s,{type:'draft',index:selected});expect(s.lucasPhoto!.messages).toHaveLength(count)
    s=act(s,{type:'send'})
    expect(s.lucasPhoto!.messages.some(m=>m.text===lucasPhotoBeats[n].choices[selected])).toBe(true)
    expect(s.lucasPhoto!.messages.some(m=>m.text===lucasPhotoBeats[n].replies[selected])).toBe(true)
   }
   expect(s.lucasPhoto!.messages.filter(m=>m.id===storyPhotos.lucasFriends.id)).toHaveLength(1)
   expect(s.evidence[storyPhotos.lucasFriends.id]).toBeUndefined()
   expect(s.prologue!.scene01!.groupMembers!.lucas).toBe(false)
   expect(act(s,{type:'send'})).toEqual(s)
  }
 })
})
