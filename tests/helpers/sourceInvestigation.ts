import { Scene05Fixture } from './scene05Final'
import { correctionsDeskAction } from '../../src/game/scene06'
import { sourceAction, sourcePrefix, type SourceAction, type SourceScene } from '../../src/game/sourceInvestigation'
import { draftActIChoice } from '../../src/game/scene01'

export class SourceFixture extends Scene05Fixture {
 number:SourceScene=7
 constructor(){super();this.core();this.do({type:'local',id:'S05-C11',choice:'a'});this.save=correctionsDeskAction(this.save,{type:'enter'},this.now)
  const desk=(a:Parameters<typeof correctionsDeskAction>[1])=>{this.save=correctionsDeskAction(this.save,a,this.now+=100)}
  for(const panel of ['register','scope'] as const){desk({type:'panel',panel});desk({type:'read'})}
  desk({type:'local',id:'S06-C03',choice:'b'});for(const id of ['article','index','register'] as const)desk({type:'card',id});desk({type:'local',id:'S06-C04',choice:'c'});desk({type:'local',id:'S06-C07',choice:'a'});desk({type:'local',id:'S06-C14',choice:'a'});desk({type:'next-lead'})
 }
 source(a:SourceAction){this.save=sourceAction(this.save,this.number,a,this.now+=100);return this.drain()}
 inspect(page:string,ids:string[]=[]){this.source({type:'panel',panel:page});for(const id of ids)this.source({type:'inspect',id});if(page!=='roles')this.source({type:'read',page});return this.source({type:'back'})}
 local(i:number,choice='a'){return this.source({type:'local',id:`${sourcePrefix(this.number)}-C${String(i).padStart(2,'0')}`,choice})}
 core7(){return this.inspect('article').inspect('profile').local(2).local(3,'b').inspect('note').inspect('reference',['issuer','content','cross-reference']).local(5,'c').local(6,'b').inspect('catalogue',['search-scope','no-match-limit']).local(13)}
 enter8(){this.local(15);this.source({type:'next-lead'});this.number=8;return this}
 core8(){return this.inspect('directory').local(2,'b').inspect('roles',['issuer','custodian','routing']).local(3).inspect('index').local(4,'c').inspect('guide',['name-role-limit','transfer-limit']).local(6,'b').local(7,'c').local(10,'b')}
  enter9(){this.local(16);this.source({type:'next-lead'});this.number=9;return this}
  core9(){this.inspect('register',['entry-number','series-dates','custody-fields']);for(const [i,c] of [[2,'b'],[3,'a'],[4,'c'],[5,'b']] as const)this.local(i,c);this.inspect('finding-aid',['coverage-limit','access-limit']);for(const [i,c] of [[6,'c'],[7,'a'],[8,'b'],[9,'c'],[17,'a']] as const)this.local(i,c);return this}
 enter10(){this.local(18);this.source({type:'next-lead'});this.number=10;return this}
 core10(){
  this.inspect('box-index',['source','box03','public-coverage']).local(2,'b').local(3,'c').inspect('fields',['series','box','item']).local(4)
  this.source({type:'panel',panel:'descriptor'}).source({type:'inspect',id:'descriptor-row'}).local(5,'c').source({type:'read',page:'descriptor'}).source({type:'back'})
  this.inspect('dates',['box-date']).local(6,'b').inspect('compare').local(7).inspect('access',['access-note']).local(8,'c')
  this.source({type:'panel',panel:'search'}).source({type:'query',term:'GH-DSC-03-A'}).source({type:'inspect',id:'search-limit'}).source({type:'back'}).local(9,'b').local(10)
  this.source({type:'panel',panel:'puzzle'});for(const [from,to] of [['transfer-summary','GH-INV-2022-063'],['summary-extract','GH-INV-2022-063-EX1'],['box-descriptor','GH-DSC-03-A (REFERENCE ONLY)'],['publisher-unlinked','UNLINKED'],['receipt-communication','COMMUNICATION ONLY']])this.source({type:'match',from,to})
  return this.local(19,'b').source({type:'back'}).source({type:'panel',panel:'case-board'})
 }
 commit10(choice='a'){return this.source({type:'stance-draft',choice}).local(20,choice)}
 reply(id='a'){this.save=draftActIChoice(this.save,id);return this.send(id)}
}
