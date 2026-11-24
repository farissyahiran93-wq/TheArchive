import { describe, expect, it } from 'vitest'
import { lucasConversation, lucasPhotoBeats } from '../content/lucasPhoto'
import { storyPhotos } from '../content/storyPhotos'
import { beginScene01 } from './scene01'
import { lucasPhotoAction as act } from './lucasPhoto'
import { validateLucasPhoto } from './lucasPhoto'
import { newGame, type GameSave } from './types'

function departed():GameSave{
 const s=beginScene01({...newGame(),masterOpening:true},1000)
 return {...s,prologue:{...s.prologue!,scene01:{...s.prologue!.scene01!,masterScene02Revision:3,lucasLeftGroup:true,groupMembers:{sophie:true,maya:true,lucas:false}}}}
}
function drain(s:GameSave){
 while(s.lucasPhoto?.pending){
  const due=s.lucasPhoto.pending.dueAt
  const count=s.lucasPhoto.messages.length
  expect(act(s,{type:'tick'},due-1)).toBe(s)
  s=act(s,{type:'tick'},due)
  expect(s.lucasPhoto?.messages).toHaveLength(count+1)
  validateLucasPhoto(s.lucasPhoto)
 }
 return s
}

describe('Lucas private photo conversation',()=>{
 it('resumes every branch of an existing three-turn Lucas exchange',()=>{
  for(let target=0;target<3;target++)for(let option=0;option<3;option++){
   let s=departed()
   s={...s,lucasPhoto:{version:1,beat:0,messages:[{id:'TA-S08-LUCAS-PHOTO-INTRO',sender:'lucas',text:'A previously delivered introduction.',at:10}],complete:false}}
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
 it('requires a departure and six explicit Sends, preserves the draft and delivers the photograph once',()=>{
  const empty=newGame()
  expect(act(empty,{type:'start'})).toBe(empty)
  for(let option=0;option<3;option++){
   let s=act(departed(),{type:'start'},2000)
   for(const [beat,turn] of lucasConversation.entries()){
    expect(act(s,{type:'draft',index:0})).toBe(s)
    s=drain(s)
    expect(s.lucasPhoto?.messages.some(m=>m.photo)).toBe(beat>=4)
    expect(act(s,{type:'send'})).toBe(s)
    const index=option%turn.choices.length
    s=act(s,{type:'draft',index})
    s=JSON.parse(JSON.stringify(s)) as GameSave
    validateLucasPhoto(s.lucasPhoto)
    s=act(s,{type:'send'},50000*(beat+1))
    expect(s.messages.at(-1)).toMatchObject({recipient:'lucas',text:turn.choices[index]})
   }
   s=drain(s)
   expect(s.lucasPhoto?.complete).toBe(true)
   expect(s.lucasPhoto?.messages.filter(m=>m.photo)).toHaveLength(1)
   expect(s.lucasPhoto?.messages.at(-1)?.text).toBe('I just wanted you to see who my friend was.')
   expect(act(s,{type:'start'})).toBe(s)
  }
 })
})
