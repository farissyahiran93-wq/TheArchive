"""Pinned handoff v1: line ranges retain exact authored bubbles and wrapped text."""
from pathlib import Path
import re,json
lines=Path('docs/sources/CHAPTER2_SCENES10_15.txt').read_text(encoding='utf-8-sig').splitlines()
ranges={
'10_empathic':(71,77),'10_skeptical':(78,83),'10_neutral':(84,90),'10_common':(91,110),
'G10_01_A':(118,128),'G10_01_B':(131,139),'G10_01_C':(142,150),'G10_01_D':(153,160),'10_after1':(163,176),
'G10_02_A':(183,189),'G10_02_B':(191,197),'G10_02_C':(199,205),'G10_02_D':(207,210),'10_close':(213,220),
'10_lucas':(226,231),'L10_01_A':(237,240),'L10_01_B':(242,246),'L10_01_C':(248,251),'10_lucas_after':(254,256),
'L10_02_A':(261,263),'L10_02_B':(264,267),'L10_02_C':(268,272),
'12_open':(421,426),'S12_01_A':(432,435),'S12_01_B':(437,441),'S12_01_C':(443,447),'12_memory':(450,456),
'S12_02_A':(462,467),'S12_02_B':(469,474),'S12_02_C':(476,481),'12_picture':(484,491),
'S12_03_A':(504,510),'S12_03_B':(513,521),'S12_03_C':(524,530),'S12_03_D':(534,537),
'S12_03D_A':(542,547),'S12_03D_B':(548,553),'S12_03D_C':(554,559),'12_after3':(566,569),
'S12_04_A':(576,579),'S12_04_B':(581,587),'S12_04_C':(589,593),'S12_04_D':(595,598),
'12_close':(601,604),'12_playful':(605,606),'12_goodnight':(607,609),
'E14_02_A':(824,829),'E14_02A_A':(833,836),'E14_02A_B':(837,841),
'E14_02_B':(847,852),'E14_02B_A':(856,860),'E14_02B_B':(861,864),
'D15_A':(910,915),'D15_A2_A':(920,923),'D15_A2_B':(924,927),'D15_A2_C':(928,931),'15_a_close':(932,936),
'D15_B':(952,959),'D15_B2_A':(964,968),'D15_B2_B':(969,972),'D15_B2_C':(973,976),'15_b_close':(977,981),
'D15_C_new':(998,1001),'D15_C_known':(1002,1005),'15_c_new':(1008,1014),'15_c_known':(1015,1019),
'D15_C2_A':(1025,1029),'D15_C2_B':(1030,1034),'D15_C2_C':(1035,1039),'15_c_close':(1040,1045),
'15_final_a':(1072,1074),'15_final_c':(1075,1077),'15_final_other':(1078,1081),'15_final':(1082,1097),
}
blocks={}
for key,(a,b) in ranges.items():
 out=[];current=None
 for line in lines[a:b]:
  m=re.match(r'^(MAYA|LUCAS|SOPHIE|ELI|NORA|PLAYER): (.*)$',line)
  if m:
   current={'actor':m[1].lower(),'text':m[2]};out.append(current)
  elif line.startswith('[PACE]'):
   out.append({'actor':'wait','text':line});current=None
  elif line.strip() and not line.startswith(('[','PLAYER CHOICE')) and current:
   current['text']+=' '+line.strip()
  else:current=None
 blocks[key]=out
blocks['10_skeptical'].append({'actor':'nora','text':"Lucas, nobody needs to prove they're innocent of something we haven't even established happened."})
Path('src/content/continuationSource.ts').write_text('// Owner screenplay v1; source ranges pinned in scripts/import-continuation.py.\nexport const continuationSource = '+json.dumps(blocks,ensure_ascii=False,indent=2)+' as const\n',encoding='utf-8')
print({k:len(v) for k,v in blocks.items()})
