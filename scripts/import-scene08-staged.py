"""Stage exact Scene 08 options and public copy; do not register playable nodes."""
import hashlib,json,re
from pathlib import Path
path=Path('docs/sources/scene08-final/FULL_SCRIPT.txt')
raw=path.read_bytes();source=raw.decode('utf-8-sig')
headings=list(re.finditer(r'^S08-C(\d{2}) — ([^\n]+)',source,re.M))
assert len(headings)==16
choices=[]
for i,h in enumerate(headings):
 number=int(h[1]);region=source[h.end():headings[i+1].start() if i+1<len(headings) else source.index('One private event on actual C16 commitment:',h.end())]
 matches=list(re.finditer(r"^[ \t]+([ABC])\.\s+(?:Player(?: \[[^\]]+\])?:\s*)?'([\s\S]*?)'[ \t]*(?=\n|$)",region,re.M))
 assert [m[1] for m in matches]==['A','B','C'],(number,[m[1] for m in matches])
 mode={8:'civic-inquiry',9:'civic-followup',12:'nora-professional',13:'sophie-private',14:'sophie-private',15:'group'}.get(number,'local')
 choices.append({'id':f'S08-C{number:02}','mode':mode,'heading':h[2].strip(),'options':[{'id':m[1].lower(),'text':' '.join(m[2].split())} for m in matches]})
assert [c['id'] for c in choices]==[f'S08-C{i:02}' for i in range(1,17)]
bodies=re.findall(r'=========== EXACT IN-WORLD PAGE COPY ===========\s*([\s\S]*?)\s*=========== END PAGE COPY ===========',source)
assert len(bodies)==3
pages={}
for (ident,route),body in zip([
 ('GH-CIVIC-DIRECTORY-001','browser://greyhaven/civic-records/service-directory'),
 ('GH-CIVIC-INDEX-HELP-001','browser://greyhaven/civic-records/index/search-help'),
 ('GH-FORMER-OFFICE-GUIDE-001','browser://greyhaven/civic-records/guidance/former-offices')],bodies):
 pages[ident]={'route':route,'paragraphs':[' '.join(p.split()) for p in body.split('\n\n') if p.strip()]}
metadata={'authoringId':'chapter_01_scene_08_the_missing_issuer','planningId':'ch01_sc08_the_page_she_kept','status':'authored-staged','playable':False,'sourceSha256':hashlib.sha256(raw).hexdigest(),'prerequisite':{'scene':'THE BYLINE','completionChoice':'S07-C15','actualSavedCompletionRequired':True,'manualEntryRequired':True},'choiceSets':16,'alternatives':48,'targetQaScenarios':52,'nextLead':'THE TRANSFER REGISTER','nextLeadPlayable':False}
out="// Generated from the pinned Scene 08 manuscript. AUTHORED ONLY; not in the live graph.\n"
out+="export type Scene08StagedChoice = { readonly id: `S08-C${string}`; readonly mode: 'local'|'civic-inquiry'|'civic-followup'|'nora-professional'|'sophie-private'|'group'; readonly heading:string; readonly options:readonly {readonly id:'a'|'b'|'c';readonly text:string}[] }\n"
for name,val in [('scene08StagedMetadata',metadata),('scene08StagedChoices',choices),('scene08StagedPages',pages)]:
 out+='export const '+name+' = '+json.dumps(val,ensure_ascii=False,indent=2)+' as const'+(' satisfies readonly Scene08StagedChoice[]' if name=='scene08StagedChoices' else '')+'\n'
Path('src/content/scene08Staged.ts').write_text(out,encoding='utf-8')
print('Staged 16 choice sets / 48 exact options / 3 pages. No live graph nodes or save flags created.')
