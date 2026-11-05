import { guidanceTarget, type GuidanceAction, type GuidanceTarget } from '../game/guidance'
import { readMenuPreferences } from '../game/menuPreferences'
import type { GameSave } from '../game/types'
import './guidance-dot.css'

/** A read-only hint. It never chooses a response, sends a line or opens a source. */
export function GuidanceDot({ save, action, app, thread, home = false, active }: {
  save: GameSave; action?: GuidanceAction | readonly GuidanceAction[]; app?: GuidanceTarget['app']; thread?: GuidanceTarget['thread']; home?: boolean; active?: boolean
}) {
  const mode=readMenuPreferences().guidance
  if(mode==='off'||!home&&mode!=='on')return null
  const target=guidanceTarget(save)
  const matches=active??(!!target && (action!==undefined?(Array.isArray(action)?action.includes(target.action):target.action===action):thread!==undefined?target.app==='messages'&&target.thread===thread:app!==undefined&&target.app===app))
  return matches?<span className={`guidance-dot${save.settings.reduceMotion||readMenuPreferences().reduceMotion?' guidance-static':''}`} aria-hidden="true" data-guidance-action={target?.action}/>:null
}
