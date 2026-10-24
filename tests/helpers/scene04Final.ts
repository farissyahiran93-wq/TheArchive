import { ActIFinalFixture } from './actIFinal'
import { chapter1Action,chapter1NextDue } from '../../src/game/chapter1'
import { openScene03,publicStoryAction } from '../../src/game/scene01'
import type { GameSave } from '../../src/game/types'

export class Scene04Fixture extends ActIFinalFixture {
  constructor(save?:GameSave){super(save??new ActIFinalFixture().until('complete').save);this.tick().open()}
  tick(){this.save=chapter1Action(this.save,{type:'tick'},this.now+=100);const due=chapter1NextDue(this.save);if(Number.isFinite(due)){this.now=Math.max(this.now,due);this.save=chapter1Action(this.save,{type:'tick'},this.now)}return this}
  open(){this.save=openScene03(this.save,this.now+=100);return this.drain()}
  do(action:Parameters<typeof publicStoryAction>[1]){this.save=publicStoryAction(this.save,action,this.now+=100);return this.drain()}
  at(target:string,options:{group?:boolean;pick?:string;savePick?:string}={}){
    for(let i=0;i<250;i++){
      const node=this.node()
      if(node.id===target||target==='complete04'&&this.save.chapter1?.publicStory?.complete)return this
      if(node.kind==='gate'){
        if(node.action==='s04-article')this.do({type:'open-article'}).do({type:'mark-read'}).do({type:'return-sophie'})
        else if(node.action==='s04-group'){if(options.group)this.act('open-group');else this.do({type:'group-later'})}
        else if(node.action==='s04-return-sophie')this.open()
        else if(node.action==='s04-archive')this.do({type:'open-index'})
        else if(node.action==='s04-index-ack')this.do({type:'acknowledge'})
        else if(node.action==='s04-device')this.do({type:'device'}).tick().open()
        else throw Error('Unhandled gate '+node.id)
      }else if(node.kind==='choice')this.send(node.id==='OPEN-S04-C11'?options.savePick??'d':node.choices.some(c=>c.id===options.pick)?options.pick:node.choices[0].id)
      else throw Error('Unhandled '+node.id)
    }throw Error('Unreachable '+target)
  }
}
