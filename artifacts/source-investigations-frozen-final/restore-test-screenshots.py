"""Preserve generated QA screenshots, then restore only initially clean tracked PNG baselines."""
import hashlib,json,subprocess
from pathlib import Path
root=Path(__file__).resolve().parents[2]
expected='70bd7a0ba163e62bbdea9cd25f6dfae8bd406305'
assert subprocess.check_output(['git','rev-parse','HEAD'],cwd=root,text=True).strip()==expected,'HEAD changed; review before restoring baselines'
result=json.loads((Path(__file__).parent/'completion.json').read_text(encoding='utf-8-sig'))
assert result['exitCode']==0,'Do not restore before successful full browser completion'
paths=subprocess.check_output(['git','diff','--name-only','--','qa','artifacts/chat-polish'],cwd=root,text=True).splitlines()
records=[]
for rel in paths:
 if not rel.lower().endswith('.png'):continue
 assert rel.startswith(('qa/','artifacts/chat-polish/')) and '..' not in Path(rel).parts
 target=(root/rel).resolve();assert target.is_relative_to(root)
 current=target.read_bytes();baseline=subprocess.check_output(['git','show',f'HEAD:{rel}'],cwd=root)
 backup=Path(__file__).parent/'legacy-screenshots'/rel;backup.parent.mkdir(parents=True,exist_ok=True);backup.write_bytes(current)
 target.write_bytes(baseline)
 records.append({'path':rel,'generatedSha256':hashlib.sha256(current).hexdigest(),'restoredSha256':hashlib.sha256(baseline).hexdigest()})
(Path(__file__).parent/'restored-baselines.json').write_text(json.dumps(records,indent=2),encoding='utf-8')
print(f'Preserved generated snapshots and restored {len(records)} initially clean tracked PNG baselines.')
