import { Scene04Fixture } from './scene04Final'
import { versionHistoryAction, versionHistoryPut, type VersionHistoryAction } from '../../src/game/scene05'
import { ActIFinalFixture } from './actIFinal'
import type { GameSave } from '../../src/game/types'

export class Scene05Fixture extends ActIFinalFixture {
  constructor(save?:GameSave){super(save??new Scene04Fixture().at('complete04').save);if(!this.save.chapter1?.versionHistory){this.save=versionHistoryPut(this.save,{});this.save.chapter1!.completed=[4]}this.do({type:'enter'})}
  do(a:VersionHistoryAction){this.save=versionHistoryAction(this.save,a,this.now+=100);return this.drain()}
  core(){return this.do({type:'panel',panel:'public'}).do({type:'back'}).do({type:'panel',panel:'index'}).do({type:'back'}).do({type:'local',id:'S05-C01',choice:'a'}).do({type:'panel',panel:'policy'}).do({type:'read-policy'}).do({type:'back'}).do({type:'local',id:'S05-C02',choice:'b'}).do({type:'check',index:0}).do({type:'check',index:1}).do({type:'check',index:2}).do({type:'check',index:3}).do({type:'local',id:'S05-C03',choice:'a'})}
  thread(thread:'sophie'|'group'){return this.do({type:'thread',thread})}
  at(target:string){for(let i=0;i<35;i++){if(this.node().id===target)return this;const n=this.node();if(n.kind==='gate'&&n.action==='s05-bonus')this.do({type:'skip-bonus'});else if(n.kind==='choice')this.send(n.choices[0].id);else throw Error('Unexpected '+n.id)}throw Error('Unreachable '+target)}
}
