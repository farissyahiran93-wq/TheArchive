import { expandedMirror } from '../e2e/life-helper'
import { chapter2Access,accessNextDue,type AccessAction } from '../../src/game/chapter2Access'
import { reunionChoices,startReunion,noteReunionExploration } from '../../src/game/chapter2Reunion'
import type { StoryThread } from '../../src/content/chapter2Reunion'
import type { GameSave } from '../../src/game/types'
export class ContinuationFixture {
 save:GameSave;now:number;testing=true
 constructor(){this.save=expandedMirror();this.now=Math.max(...this.save.chapter2Access!.messages.map(m=>m.at))+10000}
 act(a:AccessAction){this.save=chapter2Access(this.save,a,this.now,this.testing);return this}
 tick(at:number){this.now=Math.max(this.now,at);return this.act({type:'tick'})}
 open(thread:StoryThread){return this.act({type:'story-open',thread}).drain(thread)}
 close(thread:StoryThread){return this.act({type:'story-close',thread})}
 drain(thread:StoryThread){for(let i=0;i<1000;i++){const q=this.save.chapter2Access!.story!.sessions[thread]?.queue;if(q?.dueAt===undefined)return this;this.tick(q.dueAt)}throw Error('queue stalled')}
 send(thread:StoryThread,id:string){this.now+=10;this.act({type:'story-draft',thread,id}).act({type:'story-send',thread,id});return this.drain(thread)}
 finish(thread:StoryThread,picks:Record<string,string>={}){for(let i=0;i<200;i++){const current=this.save.chapter2Access!.story!.sessions[thread]!;if(current.finished)return this;const opts=reunionChoices(this.save,thread),option=opts.find(o=>o.id===(picks[current.node]??'a'))??opts[0];if(!option)throw Error(current.node);this.send(thread,option.id)}throw Error('no ending')}
 next(){const due=accessNextDue(this.save,this.testing);if(Number.isFinite(due))this.tick(due);return this}
 scene10(tone='a'){
  this.act({type:'life-navigate',location:{app:'Mail',item:'LIFE-E4'}}).act({type:'start-recovery'})
  this.now+=18000;this.save=startReunion(this.save,this.now);this.open('group').finish('group',{G04:'c'}).close('group')
  this.tick(this.now+31000).tick(this.now+1).open('unknown').finish('unknown').act({type:'story-skip-first'}).close('unknown')
  this.save=noteReunionExploration(this.save);this.tick(this.now+13000)
  this.act({type:'story-open',thread:'maya-lucas'})
  for(let i=0;i<200&&!this.save.chapter2Access!.story!.spy['maya-lucas']!.complete;i++)this.next()
  this.open('unknown').finish('unknown',{'S09-R1':tone}).close('unknown').next().next()
  return this.open('group')
 }
 scene11(){if(!this.save.chapter2Access?.story?.continuation)this.scene10();this.finish('group').close('group');return this.act({type:'continuation-panel',panel:'compare'})}
 scene12(){this.scene11();for(const id of ['lucas','maya','draft'])this.act({type:'continuation-inspect',id});this.act({type:'continuation-journal',choice:'C11_01',index:3}).act({type:'continuation-panel'}).act({type:'continuation-messages-open'});return this.open('sophie')}
 scene13(){this.scene12().finish('sophie').close('sophie').next();return this.act({type:'continuation-panel',panel:'recovery'})}
 scene14(){this.scene13().act({type:'continuation-inspect',id:'RD-01'}).act({type:'continuation-journal',choice:'R13_01',index:2});return this.act({type:'continuation-panel',panel:'cross'}).act({type:'continuation-inspect',id:'token'})}
 scene15(){this.scene14().act({type:'continuation-journal',choice:'E14_01',index:3}).act({type:'continuation-help',who:'none'});return this.act({type:'continuation-panel',panel:'disclosure'})}
}
