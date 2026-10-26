import hashlib,json,subprocess,sys
from pathlib import Path
root=Path.cwd();dest=Path(__file__).parent
files=subprocess.check_output(['rg','--files','src','tests','scripts','docs/sources'],text=True).splitlines()
files=[f for f in files if Path(f).suffix in ['.ts','.tsx','.css','.py','.txt']]
files += [f for f in ['package.json','package-lock.json','playwright.config.ts','vite.config.ts','tsconfig.json','tsconfig.app.json','tsconfig.node.json'] if Path(f).exists()]
values={f:hashlib.sha256(Path(f).read_bytes()).hexdigest() for f in sorted(files)}
assert sys.argv[1] in ['before','after']
(dest/(sys.argv[1]+'-hashes.json')).write_text(json.dumps(values,indent=2),encoding='utf8')
if sys.argv[1]=='after':
 before=json.loads((dest/'before-hashes.json').read_text(encoding='utf8'));changed=sorted(k for k in set(before)|set(values) if before.get(k)!=values.get(k))
 (dest/'source-integrity.json').write_text(json.dumps({'unchanged':not changed,'changed':changed,'files':len(values)},indent=2),encoding='utf8')
 if changed:sys.exit(99)
