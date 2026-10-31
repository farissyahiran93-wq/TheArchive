import { ActIFinalFixture } from './actIFinal'
import { Scene04Fixture } from './scene04Final'
import { newGame, type GameSave } from '../../src/game/types'
import { beginScene01, draftActIChoice, pauseScene03 } from '../../src/game/scene01'
import { chapter1Action, chapter1NextDue } from '../../src/game/chapter1'
import { originAction } from '../../src/game/archiveOrigin'
import { versionHistoryAction, type VersionHistoryAction } from '../../src/game/scene05'

export class ConversationFixture extends ActIFinalFixture {
  constructor(save?:GameSave){
    super(save??new Scene04Fixture(new ActIFinalFixture(beginScene01(newGame(),1800000000000)).until('complete').save).at('complete04').save)
  }
  override send(id='a'){this.save=draftActIChoice(this.save,id);return super.send(id)}
  tickOne(){const due=chapter1NextDue(this.save);if(Number.isFinite(due)){this.now=Math.max(this.now,due);this.save=chapter1Action(this.save,{type:'tick'},this.now)}return this}
  origin(type:Parameters<typeof originAction>[1]['type']){this.save=originAction(this.save,{type},this.now+=100);return this.drain()}
  do(a:VersionHistoryAction){this.save=versionHistoryAction(this.save,a,this.now+=100);return this.drain()}
  bridge(){this.tickOne().origin('open');for(let i=0;i<30&&!this.save.chapter1!.archiveOrigin!.checkpoint?.complete;i++){const n=this.node();if(n.kind!=='choice')throw Error(n.id);this.send(n.choices[0].id)}return this}
  install(){this.origin('security').origin('install');for(let i=0;i<3;i++)this.tickOne();return this.origin('cancel')}
  enter(){this.origin('inspect').do({type:'enter'});const p=this.save.chapter1!.versionHistory!;p.flags=p.flags.filter(f=>f!=='new_dialogue'&&f!=='flexible_sources');return this}
  sources(){return this.do({type:'panel',panel:'public'}).do({type:'read-article'}).do({type:'inspect-metadata'}).do({type:'save-update-analysis'}).do({type:'get-index'}).do({type:'panel',panel:'index'}).do({type:'panel',panel:'policy'}).do({type:'read-policy'}).do({type:'back'})}
  unknown(){if(!this.save.deliveredEvents.includes('CH1-VH-START')){for(let i=0;i<4&&!this.save.deliveredEvents.includes('CH1-VH-START');i++)this.tickOne()}return this.do({type:'thread',thread:'unknown'})}
  atChoice(target:string,pick='a'){
    for(let i=0;i<40;i++){
      if(this.node().id===target)return this
      const n=this.node()
      if(n.kind==='choice')this.send(n.choices.some(c=>c.id===pick)?pick:n.choices[0].id)
      else if(n.kind==='gate'&&n.action==='vh-source'){
        if(n.id.endsWith('06'))for(let index=0;index<4;index++)this.do({type:'check',index})
        this.save=pauseScene03(this.save,this.now);this.unknown()
      }else if(this.save.chapter1!.versionHistory!.complete)return this
      else throw Error('Unsettled '+n.id)
    }
    throw Error('Unreachable '+target)
  }
  core(pick='a'){return this.bridge().install().enter().sources().unknown().atChoice('OPEN-VH-END',pick)}
}
