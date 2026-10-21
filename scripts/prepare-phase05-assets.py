"""Deterministic user-requested collage crops and local game-asset preparation. No generative edits."""
from pathlib import Path
import argparse, hashlib, json
from PIL import Image, ImageChops, ImageOps

parser = argparse.ArgumentParser()
parser.add_argument('--source-dir', type=Path, required=True)
parser.add_argument('--output-root', type=Path, default=Path('.'))
args = parser.parse_args()
root = args.output_root.resolve()
source = args.source_dir.resolve()
sha = lambda path: hashlib.sha256(path.read_bytes()).hexdigest()
manifest = {'source_collage': {'file': 'gambar dalam phone daniel.png', 'sha256': sha(source / 'gambar dalam phone daniel.png')}, 'crops': [], 'gallery': [], 'portraits': []}
collage = Image.open(source / 'gambar dalam phone daniel.png').convert('RGB')
if collage.size != (1536, 1024):
    raise ValueError('Crop bounds are specific to the supplied 1536 x 1024 source. Inspect any replacement first.')
crops = root / 'artifacts/phase05/daniel-collage-crops'
crops.mkdir(parents=True, exist_ok=True)
names = ['01-shelf-photo','02-message-crop','03-index-crop-1','04-index-crop-2','05-notice-board-photo','06-map-screenshot']
boxes = [(0,0,507,517),(514,0,1021,517),(1028,0,1536,517),(0,522,507,1024),(514,522,1021,1024),(1028,522,1536,1024)]
for name, box in zip(names, boxes):
    crop = collage.crop(box)
    path = crops / f'{name}.png'
    crop.save(path, optimize=True)
    if ImageChops.difference(crop, Image.open(path).convert('RGB')).getbbox():
        raise ValueError(f'Lossless crop check failed: {path}')
    manifest['crops'].append({'file': path.relative_to(root).as_posix(), 'box': list(box), 'size': list(crop.size), 'sha256': sha(path)})

# Runtime copies are PNG originals; thumbnails/identity artwork are derived WebP.
prepared = root / 'public/media'
gallery_out = prepared / 'gallery'
portrait_out = prepared / 'portraits'
gallery_out.mkdir(parents=True, exist_ok=True)
portrait_out.mkdir(parents=True, exist_ok=True)
pack = source / 'TheArchive_Daniel_Gallery_6_Evidence_Assets'
for index, path in enumerate(sorted(pack.glob('*.png')), 1):
    image = Image.open(path).convert('RGB')
    runtime = gallery_out / f'{names[index-1]}.png'
    runtime.write_bytes(path.read_bytes())
    if ImageChops.difference(image, Image.open(runtime).convert('RGB')).getbbox():
        raise ValueError('Runtime gallery pixels differ from supplied source')
    thumb = image.copy()
    thumb.thumbnail((320, 320), Image.Resampling.LANCZOS)
    thumbnail = gallery_out / f'{names[index-1]}-thumb.webp'
    thumb.save(thumbnail, format='WEBP', quality=88, method=6)
    manifest['gallery'].append({'source': path.name, 'source_sha256': sha(path), 'runtime': f'/media/gallery/{runtime.name}', 'thumbnail': f'/media/gallery/{thumbnail.name}', 'width': image.width, 'height': image.height, 'bytes': runtime.stat().st_size, 'runtime_sha256': sha(runtime), 'pixel_identical_to_source': True, 'capture_timestamp': None, 'gps': None})

portraits = [('daniel','daniel.png'),('sophie','sophie mercer.png'),('maya','maya chen.png'),('lucas','lucas grey.png'),('eli','eli ward.png'),('nora','nora vance.png'),('ana','Ana Pierce.png'),('rowan','rowan bell.png'),('vivian','vivian hale.png'),('june','June Ellis.png')]
for key, filename in portraits:
    original = source / filename
    image = Image.open(original).convert('RGB')
    full = image.copy()
    full.thumbnail((720, 720), Image.Resampling.LANCZOS)
    runtime = portrait_out / f'{key}.webp'
    full.save(runtime, format='WEBP', quality=90, method=6)
    thumb = ImageOps.fit(image, (160,160), Image.Resampling.LANCZOS, centering=(0.5,0.35))
    thumbnail = portrait_out / f'{key}-avatar.webp'
    thumb.save(thumbnail, format='WEBP', quality=90, method=6)
    manifest['portraits'].append({'id': key, 'source': filename, 'source_sha256': sha(original), 'runtime': f'/media/portraits/{runtime.name}', 'avatar': f'/media/portraits/{thumbnail.name}', 'width': full.width, 'height': full.height, 'bytes': runtime.stat().st_size, 'runtime_sha256': sha(runtime)})

out = root / 'artifacts/phase05/asset-manifest.json'
out.write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')
print(json.dumps({'collage_crops':len(manifest['crops']),'gallery_images':len(manifest['gallery']),'portraits':len(manifest['portraits']),'gallery_runtime_bytes':sum(item['bytes'] for item in manifest['gallery']),'portrait_runtime_bytes':sum(item['bytes'] for item in manifest['portraits']),'manifest':str(out)}))
