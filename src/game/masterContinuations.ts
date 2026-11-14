import type { GameSave } from './types'
import { masterScene05Action } from './masterScene05'
import { masterScene06Action } from './masterScene06'
import { masterScene07Action } from './masterScene07'
import { masterScene08Action } from './masterScene08'
import { masterScene09Action } from './masterScene09'
import { masterScene10Action } from './masterScene10'

/** Initialise the next authored scene only once its own saved prerequisites hold.
 * Initialisation never navigates, answers calls, sends player text or opens evidence. */
export function advanceMasterContinuations(save:GameSave, now=Date.now()):GameSave {
 if(!save.prologue?.scene01?.masterScene01)return save
 let next=save
 if(!next.masterScene06&&!next.masterScene07&&!next.masterScene08&&!next.masterScene09&&!next.masterScene10)next=masterScene05Action(next,{type:'start'},now)
 if(!next.masterScene07&&!next.masterScene08&&!next.masterScene09&&!next.masterScene10)next=masterScene06Action(next,{type:'start'},now)
 if(!next.masterScene08&&!next.masterScene09&&!next.masterScene10)next=masterScene07Action(next,{type:'start'},now)
 if(!next.masterScene09&&!next.masterScene10)next=masterScene08Action(next,{type:'start'},now)
 if(!next.masterScene10)next=masterScene09Action(next,{type:'start'},now)
 return masterScene10Action(next,{type:'start'},now)
}
