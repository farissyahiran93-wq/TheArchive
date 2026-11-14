import { describe, expect, it } from 'vitest'
import { traceInstallDuration, traceInstallationProgress } from './traceInstallation'
import { masterScene04Action } from './masterScene04'
import { normalizeSave } from './engine'
import { newGame } from './types'

describe('TRACE installation',()=>{
 it('resumes by saved start time and requires completion before opening',()=>{
  const base={...newGame(),masterScene04:{version:1 as const,revision:'cinematic' as const,opened:true,beat:10,messages:[],status:'accepted' as const,inspected:false,complete:true,preview:false}}
  let save=masterScene04Action(base,{type:'begin-trace-install'},1000)
  expect(save.masterScene04?.traceInstallStartedAt).toBe(1000)
  expect(masterScene04Action(save,{type:'begin-trace-install'},3000)).toBe(save)
  save=normalizeSave(JSON.parse(JSON.stringify(save)))
  expect(traceInstallationProgress(save.masterScene04!.traceInstallStartedAt!,1000)).toBe(0)
  expect(traceInstallationProgress(save.masterScene04!.traceInstallStartedAt!,4000)).toBeGreaterThan(0)
  expect(masterScene04Action(save,{type:'setup-trace'},1000+traceInstallDuration-1)).toBe(save)
  expect(traceInstallationProgress(1000,1000+traceInstallDuration)).toBe(100)
  save=masterScene04Action(save,{type:'setup-trace'},1000+traceInstallDuration)
  expect(save.masterScene04?.traceInstalled).toBe(true)
  expect(save.masterScene04?.traceInstallStartedAt).toBeUndefined()
  expect(save.deliveredEvents.filter(id=>id==='TA-S04-TRACE-INSTALLED')).toHaveLength(1)
 })
})
