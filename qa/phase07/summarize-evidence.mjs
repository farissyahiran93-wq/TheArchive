import fs from 'node:fs'
import path from 'node:path'

const root = 'qa/phase07'
const events = fs.readFileSync(path.join(root, 'ui-play-log.jsonl'), 'utf8').trim().split('\n').map(JSON.parse)
const at = label => events.find(e => e.label === label).at
const bounds = [
  ['Opening Sophie conversation', at('setup')],
  ['Recovery and installation', at('recovery screen')],
  ['Initial iPhone investigation', at('mirror home')],
  ['Optional puzzles (interleaved Gallery viewing)', at('revision lock')],
  ['Further mirror investigation and Index', at('saved map image')],
  ['Sophie follow-up and bridge', at('Sophie follow-up begins')],
  ['Bulletin investigation, detours and optional scenes', at('Bulletin entry')],
  ['GCRO verification and citation', at('GCRO request review')],
  ['Ending', at('Disclosure decision')],
  ['Complete', at('Standard route completed')],
]
const timings = bounds.slice(0, -1).map(([phase, from], i) => {
  const to = bounds[i + 1][1]
  const included = events.filter(e => e.at >= from && e.at < to)
  return { phase, from, to, wallSeconds: (Date.parse(to) - Date.parse(from)) / 1000,
    loggedApiSeconds: included.reduce((n,e)=>n+(e.apiMs??0),0)/1000 }
})
const screenshots = fs.readdirSync(root).filter(f=>f.endsWith('.png')).map(file=>{
  const bytes=fs.readFileSync(path.join(root,file))
  return {file,width:bytes.readUInt32BE(16),height:bytes.readUInt32BE(20)}
})
fs.writeFileSync(path.join(root,'evidence-summary.json'),JSON.stringify({
  primaryStart:bounds[0][1],primaryEnd:bounds.at(-1)[1],
  primaryWallSeconds:(Date.parse(bounds.at(-1)[1])-Date.parse(bounds[0][1]))/1000,
  timings,screenshots,
  limitations:[
    'Raw primary phase stayed lock because the original UI helper captured its initial binding. Use timestamp/observation boundaries above, not that phase field.',
    'Fresh alternate lock observation at 06:00:16.615Z accidentally captured the primary tab; exclude it. 48-lock-320.png was replaced with the actual alternate lock screenshot.',
    '57-home-430.png and 58-protected-status-430.png are actually 390px. 59-home-430-actual.png onward supplies the verified 430px alternate-tab audit.',
    'Wall time includes model/tool/logging overhead and an approximately 151 second resumption gap after second home page; active reading time was not measured.',
    'Logged API time is only timed successful click/fill calls; it excludes reading, waits, screenshots, tool transport and some direct locator actions. It is not active gameplay time.',
  ],
},null,2)+'\n')
console.log(JSON.stringify({timings,primaryWallSeconds:(Date.parse(bounds.at(-1)[1])-Date.parse(bounds[0][1]))/1000,screenshotCount:screenshots.length},null,2))
