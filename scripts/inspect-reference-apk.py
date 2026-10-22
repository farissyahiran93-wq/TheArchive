"""Read-only APK inventory and selected Unity metadata names. Never installs or runs the APK."""
import hashlib
import json
import re
import sys
import zipfile
from pathlib import Path

source = Path(sys.argv[1])
destination = Path(sys.argv[2])
with zipfile.ZipFile(source) as apk:
    entries = apk.namelist()
    metadata = apk.read('assets/bin/Data/Managed/Metadata/global-metadata.dat')
    names = sorted({part.decode('ascii') for part in metadata.split(b'\0') if re.fullmatch(rb'[A-Za-z_][A-Za-z0-9_.<>]{3,100}', part) and re.search(rb'Notification|Typing|Online|Offline|ScrollRect|Photo|ChatMessage', part, re.I)})
    result = {
        'file': source.name,
        'sha256': hashlib.sha256(source.read_bytes()).hexdigest(),
        'bytes': source.stat().st_size,
        'archive_entries': len(entries),
        'engine': 'Unity / IL2CPP (data.unity3d and global-metadata.dat present)',
        'native_libraries': [name for name in entries if name.startswith('lib/')],
        'selected_metadata_names': names,
        'boot_configuration': apk.read('assets/bin/Data/boot.config').decode('utf-8', errors='replace'),
        'limits': 'Static inventory and names only. Does not establish exact UI layout, implementation, timings, safety, authenticity or runtime behaviour. No extracted code or assets are used by The Archive.',
    }
destination.parent.mkdir(parents=True, exist_ok=True)
destination.write_text(json.dumps(result, indent=2), encoding='utf-8')
print(json.dumps({key: result[key] for key in ['bytes','archive_entries','engine']}))
