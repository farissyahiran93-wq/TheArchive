import { ActIFinalFixture } from './actIFinal'
import { Scene04Fixture } from './scene04Final'
import { ConversationFixture } from './versionHistoryConversation'
import { beginScene01 } from '../../src/game/scene01'
import { newGame, type GameSave } from '../../src/game/types'
import { traceAction } from '../../src/game/trace'
import { traceDurationMs } from '../../src/content/traceReference'
import { correctionsDeskAction } from '../../src/game/scene06'
import type { NaturalSource } from '../../src/content/naturalConversation'

export const naturalScene04=()=>new Scene04Fixture(new ActIFinalFixture(beginScene01(newGame(),1800000000000)).until('complete').save)
export class NaturalFixture extends ConversationFixture {
  constructor(save?:GameSave){
    super(save??naturalScene04().at('complete04').save)
    if (!save) delete this.save.prologue!.scene01!.traceBridgeRevision
  }
  scan(){
    this.save=traceAction(this.save,{type:'start'},this.now)
    this.save=traceAction(this.save,{type:'checkpoint',elapsedMs:traceDurationMs,status:'complete'},this.now+=traceDurationMs)
    this.save=traceAction(this.save,{type:'findings'},this.now)
    return this
  }
  observe(source:NaturalSource){
    if(source==='article')this.do({type:'panel',panel:'public'}).do({type:'inspect-metadata'}).do({type:'save-update-analysis'})
    if(source==='policy')this.do({type:'panel',panel:'policy'}).do({type:'read-policy'})
    if(source==='index')this.save=traceAction(this.save,{type:'findings'},this.now+=100)
    this.do({type:'back'})
    return this.unknown()
  }
  main(order:readonly NaturalSource[]=['article','index','policy']){
    this.bridge().install();this.scan().unknown().send('a')
    for(const source of order)this.observe(source).send('a')
    return this.send('a').send('b').send('c')
  }
  authorize(){return this.tickOne().unknown().send('a')}
  desk(action:Parameters<typeof correctionsDeskAction>[1]){this.save=correctionsDeskAction(this.save,action,this.now+=100);return this.drain()}
  register(){return this.desk({type:'enter'}).desk({type:'panel',panel:'register'}).desk({type:'save-finding'}).unknown()}
}
