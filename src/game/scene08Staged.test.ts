import { describe,it,expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { scene08StagedMetadata,scene08StagedChoices,scene08StagedPages } from '../content/scene08Staged'
import { actINodes } from '../content/actIRegistry'
import { chapter1ScenePlan } from '../content/chapter1Plan'

describe('Scene 08 authored staging boundary',()=>{
 it('retains all 16 stable choice sets and 48 exact authored alternatives',()=>{
  const source=readFileSync('docs/sources/scene08-final/FULL_SCRIPT.txt','utf8').replace(/\s+/g,' ')
  expect(scene08StagedChoices.map(c=>c.id)).toEqual(Array.from({length:16},(_,i)=>`S08-C${String(i+1).padStart(2,'0')}`))
  expect(scene08StagedChoices.reduce((total,c)=>total+c.options.length,0)).toBe(48)
  for(const c of scene08StagedChoices){expect(c.options.map(o=>o.id)).toEqual(['a','b','c']);for(const o of c.options)expect(source).toContain(o.text)}
 })
 it('pins the exact manuscript hash and preserves the existing planning identity',()=>{
  const hash=createHash('sha256').update(readFileSync('docs/sources/scene08-final/FULL_SCRIPT.txt')).digest('hex')
  expect(scene08StagedMetadata.sourceSha256).toBe(hash)
  expect(scene08StagedMetadata.planningId).toBe(chapter1ScenePlan[7].id)
 })
 it('keeps the three civic pages separate and verbatim rather than inventing an issuer',()=>{
  const source=readFileSync('docs/sources/scene08-final/FULL_SCRIPT.txt','utf8').replace(/\s+/g,' ')
  expect(Object.keys(scene08StagedPages)).toEqual(['GH-CIVIC-DIRECTORY-001','GH-CIVIC-INDEX-HELP-001','GH-FORMER-OFFICE-GUIDE-001'])
  for(const p of Object.values(scene08StagedPages)){expect(p.route.startsWith('browser://')).toBe(true);for(const text of p.paragraphs)expect(source).toContain(text)}
 })
 it('retains historical staging metadata while owner-authorized runtime stays final-route only',()=>{
  expect(scene08StagedMetadata.playable).toBe(false)
  expect(scene08StagedMetadata.prerequisite).toMatchObject({completionChoice:'S07-C15',actualSavedCompletionRequired:true,manualEntryRequired:true})
  expect(scene08StagedMetadata.nextLeadPlayable).toBe(false)
  expect(chapter1ScenePlan[6].implementation).toBe('structural-preview')
  expect(Object.keys(actINodes()).filter(id=>id.startsWith('OPEN-S08-'))).toEqual([])
  expect(Object.keys(actINodes({scriptRevision:'final-2026-10-23'})).some(id=>id.startsWith('OPEN-S08-'))).toBe(true)
 })
})
