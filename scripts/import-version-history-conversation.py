from pathlib import Path
import re,json
s=Path('docs/sources/version-history-2026-10-28/NARRATIVE.md').read_text(encoding='utf-8')
q=lambda t:re.findall(r'^"(.*)"\s*$',t,re.M)
names=['investigation_order','update_label','index_meaning','policy_meaning','comparison','next_strategy','private_conclusion','corrections_question','sophie_update','sophie_boundary','group_disclosure']
groups=[]
for i in range(1,12):
 start=s.index(f'## CHOICE {i:02d}')
 ends=[x for x in [s.find('\n# ACT ',start),s.find('\n## CHOICE ',start+8),s.find('\n## FINAL UNKNOWN',start)] if x>=0]
 sec=s[start:min(ends) if ends else len(s)]
 matches=list(re.finditer(r'^### ([ABC]) [—–-].*|^([ABC])\. PLAYER:',sec,re.M))
 assert len(matches)==3,(i,len(matches))
 pre=q(sec[:matches[0].start()]);branches=[];con=[]
 for j,m in enumerate(matches):
  t=sec[m.end():matches[j+1].start() if j<2 else len(sec)]
  cm=re.search(r'\*\*Convergence.*|^Converge naturally\.|^Closing:',t,re.M)
  if cm:con=q(t[cm.start():]);t=t[:cm.start()]
  quotes=q(t);assert quotes,(i,j)
  branches.append({'id':chr(97+j),'text':quotes[0],'replies':quotes[1:]})
 groups.append({'id':f's05_c{i:02d}_{names[i-1]}','prelude':pre,'branches':branches,'convergence':con})
# Optional openings are outside their choice sections.
groups[8]['prelude']=q(s[s.index('# ACT 12'):s.index('## CHOICE 09')])
groups[10]['prelude']=q(s[s.index('# ACT 13'):s.index('## CHOICE 11')])
# C10 inherits the existing convergence after C09; C11 conditional Lucas replies are marked at authoring time.
bridge=s[s.index('## ACT 1A'):s.index('## ACT 1B')]
turns=[];who=None
for line in bridge.splitlines():
 if line in ['PLAYER:','UNKNOWN NUMBER:']:who='player' if line=='PLAYER:' else 'unknown'
 elif line.startswith('"') and line.endswith('"'):turns.append({'speaker':who,'text':line[1:-1]})
final=q(s[s.index('## FINAL UNKNOWN'):s.index('# ACT 11')])
Path('src/content/versionHistoryConversationData.ts').write_text('// Authored dialogue pinned in docs/sources/version-history-2026-10-28/NARRATIVE.md.\nexport const versionHistoryDialogue = '+json.dumps(groups,ensure_ascii=False,indent=2)+' as const\nexport const archiveOriginDialogue = '+json.dumps(turns,ensure_ascii=False,indent=2)+' as const\nexport const versionHistoryClosing = '+json.dumps(final,ensure_ascii=False,indent=2)+' as const\n',encoding='utf-8')
print([(g['id'],len(g['branches']),len(g['prelude'])) for g in groups])
