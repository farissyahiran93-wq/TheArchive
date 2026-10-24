import { chapter1Action, chapter1Current, chapter1NextDue, type Chapter1Action } from '../../src/game/chapter1'
import { beginLegacyScene01 as beginScene01, deliverScene01, openScene03, scene01Choices, scene01Invitation, sendScene01Choice } from '../../src/game/scene01'
import { newGame, type GameSave } from '../../src/game/types'

export class Chapter1Fixture {
  save:GameSave; now=1800000000000
  constructor(save?:GameSave){this.save=save??beginScene01(newGame(),this.now)}
  act(action:Chapter1Action){this.save=chapter1Action(this.save,action,this.now+=100);return this}
  settle(){for(let i=0;i<300;i++){const due=Math.min(this.save.prologue?.scene01?.queue[0]?.dueAt??Infinity,chapter1NextDue(this.save));if(!Number.isFinite(due))return this;this.now=Math.max(this.now,due);this.save=chapter1Action(deliverScene01(this.save,this.now),{type:'tick'},this.now)}throw Error('Queue stalled')}
  opening(){
    this.settle()
    for(let i=0;i<300;i++){
      const scene=this.save.prologue!.scene01!
      if(scene.privateScene03?.complete)return this
      if(scene.groupComplete&&!scene.privateScene03){this.save=openScene03(this.save,this.now+=100);this.settle();continue}
      if(scene.invitation==='ready'){this.save=scene01Invitation(this.save,'join',this.now+=100);this.settle();continue}
      const choice=scene01Choices(this.save)[0]
      if(!choice)throw Error('No choice: '+scene.nodeId)
      this.save=sendScene01Choice(this.save,choice.id,'Alex',true,this.now+=100);this.settle()
    }throw Error('Opening stalled')
  }
  send(key:string,id:string){return this.act({type:'draft',key,id}).act({type:'send',key}).settle()}
  inspect(id:string){return this.act({type:'inspect',id}).act({type:'panel',panel:'hub'})}
  step(id:string){return this.act({type:'step',id})}
  advance(){return this.act({type:'advance'})}
  run(n=18){
    while(chapter1Current(this.save)<=n&&!this.save.chapter1?.chapterComplete){
      const scene=chapter1Current(this.save)
      switch(scene){
        case 4:this.inspect('CH1-PUBLIC').step('first-record').inspect('CH1-FIRST');break
        case 5:this.inspect('CH1-OLDER').act({type:'panel',panel:'compare'}).step('comparison-saved');break
        case 6:this.step('field-context').act({type:'interpret',key:'missing',id:'insufficient'});break
        case 7:this.send('nora','careful');break
        case 8:this.send('page','ask').inspect('CH1-NORA-PAGE').act({type:'panel',panel:'compare'}).step('page-compared');break
        case 9:this.inspect('CH1-PROVENANCE').step('provenance-ack');break
        case 10:this.step('snapshot-consent').inspect('CH1-LIFE');break
        case 11:this.inspect('CH1-INDEX').inspect('CH1-INDEX-NOTE').act({type:'interpret',key:'index',id:'14-13'});break
        case 12:this.send('eli-intro','introduce').send('eli','ask').step('technical-ack');break
        case 13:this.send('maya','boundary');break
        case 14:this.send('lucas','boundary');break
        case 15:this.inspect('CH1-CLAIM').step('claim-phrase').act({type:'interpret',key:'claim',id:'unverified'});break
        case 16:this.send('original','nora');break
        case 17:for(const [key,id] of [['diff','observed'],['claim','reported'],['source','unknown'],['theory','interpretation']])this.act({type:'draft',key:'board-'+key,id});this.step('board-classified').step('summary-saved');break
        case 18:this.inspect('CH1-ROLE').act({type:'interpret',key:'ending',id:'cautious'});break
        default:throw Error('Finish opening first')
      }
      this.advance()
      if(chapter1Current(this.save)===scene&&!this.save.chapter1?.chapterComplete)throw Error('Scene stalled: '+scene)
    }return this
  }
}
