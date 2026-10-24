/* Export the actual dialogue graph, including shared convergence and embedded Sends. */
const fs = require('node:fs')
const path = require('node:path')
const ts = require('typescript')
const root = path.resolve(__dirname, '..')
const cache = new Map()
function load(name) {
  const file = path.resolve(root, 'src/content', name + '.ts')
  if (cache.has(file)) return cache.get(file)
  const mod = { exports: {} }; cache.set(file, mod.exports)
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText
  new Function('require', 'exports', 'module', code)(id => load(id.replace('./', '')), mod.exports, mod)
  return mod.exports
}
const { scene01Nodes: nodes, scene01Opening } = load('scene01')
const { scene02Opening } = load('scene02')
const { scene03Opening } = load('scene03')
const name = id => id ? id[0].toUpperCase() + id.slice(1) : 'Sophie'
function walk(id) {
  const list = [], seen = new Set()
  while (id) {
    if (seen.has(id)) throw Error('Cycle: ' + id)
    seen.add(id)
    const n = nodes[id]; if (!n) throw Error('Missing node: ' + id)
    if (n.kind === 'choice' && n.number) return { list, next: n.number }
    list.push(n)
    if (n.kind === 'choice') {
      if (n.choices.length !== 1) throw Error('Unexported decision: ' + id)
      id = n.choices[0].next
    } else id = n.next
  }
  return { list, next: null }
}
function render(list) {
  const out = []
  for (const n of list) {
    if (n.kind === 'npc') out.push(`**${name(n.sender)}:** ${n.text}`)
    else if (n.kind === 'wait') out.push(`*[Pause ${n.duration / 1000}s${n.typing ? ` · ${name(n.actor)} typing` : ''}]*`)
    else if (n.kind === 'choice') out.push(`**Player — pilih + Send:** ${n.choices[0].text}`)
    else if (n.kind === 'event') {
      if (n.event === 'presence') out.push(`*[System: ${name(n.actor)} ${n.online ? 'online' : 'offline'}]*`)
      else if (n.event === 'deleted') out.push(`**System:** ${name(n.actor)} deleted a message.`)
      else if (n.event === 'leave') out.push(`**System:** ${name(n.actor)} left the group.`)
      else if (n.event === 'effects' || n.event === 'private-effects' || n.event === 'reward') {
        const effects = n.effects || n.privateEffects || Object.fromEntries(['trust', 'affinity'].filter(k => n[k] !== undefined).map(k => [k, n[k]]))
        out.push(`*[Relationship effects — ${n.event === 'private-effects' || n.event === 'reward' ? 'Sophie: ' : ''}${JSON.stringify(effects)}]*`)
      } else if (n.event === 'declined') out.push('*[Invitation ditolak/disimpan. Tiada auto-join. Pemain boleh kembali dan pilih Accept invitation.]*')
      else if (n.event === 'invitation') out.push('*[Kad jemputan FIND DANIEL. JOIN GROUP / NOT NOW memerlukan input pemain; tiada auto-join.]*')
      else if (n.event === 'group-complete') out.push('*[Scene 02 selesai. Handoff 5.5s disimpan; chat peribadi tidak dibuka automatik.]*')
      else if (n.event === 'private-complete') out.push('*[Sophie offline. Scene 03 selesai; flow baharu menunggu Scene 04.]*')
      else if (n.event === 'complete') out.push('*[Scene beat complete]*')
      else if (n.event === 'source-boundary') out.push('*[Compatibility cursor; terus ke sambungan authored.]*')
      else if (n.event === 'private-ready') out.push('*[Tunggu pemain membuka chat Sophie.]*')
      else throw Error('Unexported event: ' + n.event)
    }
  }
  return out.join('\n\n')
}
function scene(title, opening, prefix, expected) {
  const main = Object.values(nodes).filter(n => n.kind === 'choice' && n.number && (prefix === '' ? /^\d{2}$/u.test(n.number) : n.number.startsWith(prefix))).sort((a,b) => Number(a.number.replace(/\D/gu,'')) - Number(b.number.replace(/\D/gu,'')))
  if (main.length !== expected) throw Error('Wrong decision count: ' + title)
  let text = `# ${title}\n\n## Opening\n\n${render(walk(opening).list)}\n`
  let branches = 0
  for (const n of main) {
    text += `\n## Choice ${n.number} · ${n.id}\n\nPilih satu jawapan, kemudian tekan **Send**.\n`
    const routes = n.choices.map(c => walk(c.next))
    let common = 0
    while (routes.every(r => r.list.length > common) && routes.every(r => r.list.at(-1-common).id === routes[0].list.at(-1-common).id)) common++
    n.choices.forEach((c,i) => {
      branches++
      text += `\n### ${c.id.toUpperCase()}${c.premiumChoice ? ' · ★ Premium' : ''}\n\n**Player — pilih + Send:** ${c.text}\n\n`
      if (c.discloseName) text += '*[Codename hanya didedahkan melalui pilihan ini; [PLAYER_NAME] diganti selepas pemain mengisi dan menghantar.]*\n\n'
      text += render(common ? routes[i].list.slice(0,-common) : routes[i].list) + '\n'
      if (!common) text += `\n*[Seterusnya: ${routes[i].next ? 'Choice ' + routes[i].next : 'event akhir / menunggu input yang dinyatakan di atas'}]*\n`
    })
    if (common) text += `\n### Sambungan bersama — semua cabang bertemu\n\n${render(routes[0].list.slice(-common))}\n\n*[Seterusnya: ${routes[0].next ? 'Choice ' + routes[0].next : 'event akhir / menunggu input yang dinyatakan di atas'}]*\n`
  }
  return { text, count: main.length, branches }
}
const results = [scene('SCENE 01 — A MESSAGE FROM SOPHIE', scene01Opening, '', 14), scene('SCENE 02 — THE UNINVITED GUEST', scene02Opening, 'G', 13), scene('SCENE 03 — JUST BETWEEN US', scene03Opening, 'P', 19)]
results[2].text = results[2].text.replace('## Opening\n\n', `## Handoff daripada Scene 02\n\n*[Selepas 5.5s: notifikasi Sophie, sekali sahaja.]*\n\n${render(walk('OPEN-S03-FIRST-MESSAGE').list)}\n\n*[Player menekan notifikasi atau membuka chat Sophie; barulah opening berikut diteruskan.]*\n\n## Opening selepas chat dibuka\n\n`)
const warning = load('scene01Script').scene01Script.delayedWarning.map(t => t.speaker === 'wait' ? `*[Pause ${t.duration/1000}s${t.typing ? ' · Sophie typing' : ''}]*` : `**${name(t.speaker)}${t.speaker === 'player' ? ' — pilih + Send' : ''}:** ${t.text}`).join('\n\n')
results[0].text += `\n## Laluan jemputan ditangguh / ditolak\n\nJika pemain kembali dan memilih Accept invitation, warning tertangguh berikut dimainkan sebelum Choice 14. Dismiss/NOT NOW tidak menghantar balasan pemain.\n\n${warning}\n\nSeterusnya: Choice 14 → kad jemputan → JOIN GROUP.\n`
results[1].text = results[1].text.replace('## Opening\n\n','## Opening\n\n**System:** You joined FIND DANIEL.\n\n')
const folder = path.join(root,'docs/exports'); fs.mkdirSync(folder,{recursive:true})
results.forEach((r,i) => fs.writeFileSync(path.join(folder,`SCENE_0${i+1}_FULL_CONVERSATION.md`),r.text))
const summary = results.map((r,i) => `| 0${i+1} | ${r.count} | ${r.branches} |`).join('\n')
const flow = `# THE ARCHIVE — FLOW & FULL CONVERSATIONS · SCENE 01–03\n\nDieksport daripada graph runtime semasa; bukan ringkasan atau skrip baharu. Versi starred-contact export, tanpa rujukan nota Daniel dalam Scene 01–03. Semua cabang alternatif ditunjukkan untuk semakan penulis; pemain hanya melihat cabang yang dipilih.\n\n## Flow\n\nPhone → notifikasi nombor tidak dikenali → buka chat sendiri → Scene 01 (14 keputusan) → jemputan boleh diterima/ditangguh/ditolak → warning → Choice 14 → **JOIN GROUP** → Scene 02 (13 keputusan) → Lucas keluar pada semua laluan authored → permintaan Sophie untuk berbual peribadi → Choice 13 + semua follow-up Send → dialog akhir group → **delay 5.5 saat** → notifikasi Sophie: **Hey.** → pemain buka chat sendiri → Scene 03 (19 keputusan) → **Goodbye.** → Sophie offline → telefon bebas; Scene 04 belum playable.\n\nAhli group awal: Player, Sophie, Maya dan Lucas. Maya offline masih ahli; Lucas keluar memerlukan event rejoin untuk kembali. Eli dan Nora tidak bercakap atau menyertai group awal ini.\n\n## Cara membaca\n\n- Setiap baris Player memerlukan selection + Send, termasuk sub-reply di dalam cabang premium.\n- Sambungan bersama dimainkan sekali selepas cabang yang dipilih.\n- Tanda pause di bawah ialah pause authored; NPC turut mempunyai cadence typing/delivery dinamik dalam runner.\n- [PLAYER_NAME] ialah placeholder codename, bukan pengetahuan automatik NPC.\n- Relationship effects ialah metadata gameplay; bukan mesej yang dibaca pemain.\n- Hey. dihantar sekali pada handoff, sebelum opening Scene 03 di bawah.\n\n| Scene | Main decisions | Main branches |\n|---|---:|---:|\n${summary}\n\n---\n\n`
const full = flow + results.map(r => r.text).join('\n\n---\n\n')
if (/\b(handwritten|damaged note|kind of note)\b/iu.test(full)) throw Error('Stale note dialogue')
fs.writeFileSync(path.join(folder,'CH01_SCENES_01_03_FLOW_AND_FULL_CONVERSATIONS.md'), full)
console.log(JSON.stringify({ scenes: results.map(r=>({choices:r.count,branches:r.branches})), words: full.split(/\s+/u).length, file:'docs/exports/CH01_SCENES_01_03_FLOW_AND_FULL_CONVERSATIONS.md' }))
