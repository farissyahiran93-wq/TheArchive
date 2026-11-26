import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')
const source = read('src/content/masterChapterMetadata.ts')
const metadata = JSON.parse(source.slice(source.indexOf('['), source.lastIndexOf(']') + 1))
const titles = [
  'A Message from Sophie', 'Same Old Chaos', 'Just Between Us', 'The Unknown Sender',
  'The Digital Archive', 'The Missing Hour', 'Sophie’s Call', 'Maya’s Last Check-In',
  'The Secondary Card', 'The Warning',
]

assert.equal(metadata.length, 5)
for (const [index, chapter] of metadata.entries()) {
  assert.equal(chapter.number, index + 1)
  assert.deepEqual(chapter.scenes.map(scene => scene.number), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
}
assert.deepEqual(metadata[0].scenes.map(scene => scene.title), titles)
assert.equal(metadata[0].title, 'The First Trace')
assert.doesNotMatch(read('src/GameEntry.tsx'), /has\('legacyopening'\)/)
assert.match(read('src/GameEntry.tsx'), /!compatibilityFixturesEnabled&&!canContinueCampaign/)
assert.match(read('src/game/campaign.ts'), /playable: chapter\.number === 1/)
console.log('Canonical campaign registry and entry guard passed.')
