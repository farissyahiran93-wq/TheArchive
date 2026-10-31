import { describe, expect, it } from 'vitest'
import { actINodes } from '../content/actIRegistry'
import { beginScene01 } from './scene01'
import { newGame } from './types'
import { accessNodes } from '../content/chapter2Access'
import { reunionNodes } from '../content/chapter2Reunion'
import { originOpening, originFollowup, revisedUnknownEntrance, revisedSocialEntrances } from '../content/versionHistoryConversation'

const graph = () => actINodes(beginScene01(newGame(),1800000000000).prologue!.scene01!)

describe('new-route dialogue graph', () => {
  it('has no identical options in a choice group and every choice points to an existing node', () => {
    const nodes = graph()
    for (const [id,node] of Object.entries(nodes)) {
      if (node.kind !== 'choice') continue
      const normalized = node.choices.map(choice => choice.text.trim().toLowerCase())
      expect(new Set(normalized).size, id).toBe(normalized.length)
      for (const option of node.choices) {
        expect(nodes[option.next], `${id}: ${option.id}`).toBeDefined()
        if (option.withoutConsent) expect(nodes[option.withoutConsent.next], `${id}: without consent`).toBeDefined()
      }
    }
  })
  it('does not generate tone-only duplicate options in the new route', () => {
    const nodes = graph()
    for (const [id,node] of Object.entries(nodes)) {
      if (node.kind !== 'choice' || id === 'OPEN-ORIGIN-EXPLAIN-4') continue
      const tones = node.choices.filter(choice => /-tone-[12]$/.test(choice.id))
      expect(tones, id).toHaveLength(0)
    }
  })
  it('detects near-duplicate choices in the revised investigation groups', () => {
    const nodes = graph()
    const meaningful = (text:string) => new Set((text.toLowerCase().match(/[a-z]+/g) ?? []).filter(word => word.length > 2))
    for (const number of ['01','02','03','04','05','06','07','09','10','11']) {
      const id = 'OPEN-VH-NEW-C'+number, node = nodes[id]
      if (node.kind !== 'choice') throw Error(`Missing ${id}`)
      for (let i=0;i<node.choices.length;i++) for (let j=i+1;j<node.choices.length;j++) {
        const left=meaningful(node.choices[i].text), right=meaningful(node.choices[j].text)
        const intersection=[...left].filter(word=>right.has(word)).length
        const similarity=intersection/(left.size+right.size-intersection || 1)
        expect(similarity,`${id} ${node.choices[i].id}/${node.choices[j].id}`).toBeLessThan(.8)
      }
    }
  })

  it('reaches each new introduction and conversation branch from a real entrance', () => {
    const nodes=graph(), seen=new Set<string>(), pending=[originOpening,originFollowup,revisedUnknownEntrance,revisedSocialEntrances.sophie,revisedSocialEntrances.group,'OPEN-VH-NEW-SOURCE-HUB']
    while(pending.length) {
      const id=pending.pop()!
      if(seen.has(id))continue
      seen.add(id)
      const node=nodes[id]
      expect(node,`Missing node ${id}`).toBeDefined()
      if(!node)continue
      if(node.kind==='choice')for(const choice of node.choices){pending.push(choice.next);if(choice.withoutConsent)pending.push(choice.withoutConsent.next)}
      else if(node.kind==='condition')pending.push(node.next,node.otherwise)
      else if(node.kind==='gate'){pending.push(node.next);if(node.skip)pending.push(node.skip)}
      else if('next' in node && node.next)pending.push(node.next)
    }
    for(const id of Object.keys(nodes).filter(id=>id.startsWith('OPEN-ORIGIN-INTRO-')||id.includes('-INTENT-')))expect(seen.has(id),id).toBe(true)
  })

  it('audits near-duplicate wording across the active dialogue graph', () => {
    const nodes=graph(), similar:string[]=[]
    const words=(text:string)=>new Set((text.toLowerCase().match(/[a-z]+/g)??[]).filter(word=>word.length>2))
    for(const [id,node] of Object.entries(nodes)) {
      if(node.kind!=='choice')continue
      for(let i=0;i<node.choices.length;i++)for(let j=i+1;j<node.choices.length;j++) {
        const a=words(node.choices[i].text),b=words(node.choices[j].text)
        const intersection=[...a].filter(word=>b.has(word)).length
        const similarity=intersection/(a.size+b.size-intersection||1)
        if(a.size>=4 && b.size>=4 && similarity>=.9)similar.push(`${id}: ${node.choices[i].id}/${node.choices[j].id}`)
      }
    }
    expect(similar).toEqual([])
  })

  it('audits duplicate and near-duplicate options in the Chapter 2 access and reunion graphs', () => {
    const words=(text:string)=>new Set((text.toLowerCase().match(/[a-z]+/g)??[]).filter(word=>word.length>2))
    for(const group of [accessNodes,reunionNodes]) for(const [id,node] of Object.entries(group)) {
      if(node.kind!=='choice')continue
      const choices: readonly {id:string;text:string}[]=node.options
      const normalized=choices.map(choice=>choice.text.trim().toLowerCase())
      expect(new Set(normalized).size,id).toBe(normalized.length)
      for(let i=0;i<choices.length;i++)for(let j=i+1;j<choices.length;j++) {
        const a=words(choices[i].text),b=words(choices[j].text),intersection=[...a].filter(word=>b.has(word)).length
        if(a.size>=4 && b.size>=4)expect(intersection/(a.size+b.size-intersection),`${id}: ${choices[i].id}/${choices[j].id}`).toBeLessThan(.9)
      }
    }
  })

})
