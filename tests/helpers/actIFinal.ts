import { newGame, type GameSave } from '../../src/game/types'
import { beginScene01, deliverScene01, scene01Choices, sendScene01Choice, scene01Invitation, openScene03, actIAction } from '../../src/game/scene01'
import { actINodes } from '../../src/content/actIRegistry'
import { chapter1Action } from '../../src/game/chapter1'

/** Drives the production runner, stopping at every real player interaction. */
export class ActIFinalFixture {
  now=1800000000000
  save:GameSave
  constructor(save?:GameSave){this.save=save??beginScene01(newGame(),this.now);this.drain()}
  drain(){for(let i=0;i<300;i++){const due=this.save.prologue?.scene01?.queue[0]?.dueAt;if(due===undefined)return this;this.now=Math.max(this.now,due);const next=deliverScene01(this.save,this.now);if(next===this.save)return this;this.save=next}throw Error('Dialogue did not settle')}
  act(action:Parameters<typeof actIAction>[1]){this.save=actIAction(this.save,action,this.now+=100);return this.drain()}
  send(id='a'){this.save=sendScene01Choice(this.save,id,'Alex',true,this.now+=100);return this.drain()}
  node(){return actINodes(this.save.prologue!.scene01)[this.save.prologue!.scene01!.nodeId]}
  until(target:string,preferred='a'){
    for(let i=0;i<400;i++){
      const scene=this.save.prologue!.scene01!,node=this.node()
      if(scene.nodeId===target||target==='complete'&&scene.privateScene03?.complete)return this
      if(scene.invitation==='ready'){this.save=scene01Invitation(this.save,'join',this.now+=100);this.act('open-group');continue}
      if(scene.groupComplete&&!scene.privateScene03){this.save=openScene03(this.save,this.now+=100);this.drain();continue}
      if(node.kind==='gate'){this.act(node.action==='sender-request'?'later':node.action==='disclosure'?'keep':'continue');continue}
      const choices=scene01Choices(this.save),choice=choices.find(c=>c.id===preferred)??choices[0]
      if(!choice)throw Error('No interaction at '+scene.nodeId)
      this.send(choice.id)
    }throw Error('Unreachable '+target)
  }
  sender(id?:string){this.save=chapter1Action(this.save,{type:'read-sender'},this.now+=100);if(id){this.save=chapter1Action(this.save,{type:'draft',key:'sender',id},this.now);this.save=chapter1Action(this.save,{type:'send',key:'sender'},this.now+=100)}return this}
}
