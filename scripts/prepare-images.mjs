import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
const slots = {
  'exterior-wide': 'Img-5.png',
  exterior: 'Img-4.png',
  consultation: 'Img-1.png',
  examination: 'Img-2.png',
  'examination-alternate': 'Img-3.png',
  'street-reference': 'Img-6.png',
};
await mkdir('public/images', { recursive: true });
const report = [];
const slotMetadata = {};
for (const [slot, source] of Object.entries(slots)) {
  const file = `Photos/${source}`;
  const metadata = await sharp(file).metadata();
  slotMetadata[slot] = { base: slot, width: metadata.width, height: metadata.height };
  for (const size of [480, 640, 800, 960, 1600]) {
    const output = `public/images/${slot}-${size}.webp`;
    const info = await sharp(file)
      .rotate()
      .resize({ width: size, withoutEnlargement: true })
      .webp({ quality: 85, effort: 5 })
      .toFile(output);
    report.push({
      slot,
      source,
      output,
      width: info.width,
      height: info.height,
      bytes: info.size,
      originalWidth: metadata.width,
    });
  }
}
await writeFile('public/images/manifest.json', JSON.stringify(report, null, 2) + '\n');
await writeFile('src/config/image-metadata.json', JSON.stringify(slotMetadata, null, 2) + '\n');
console.log(
  `Prepared ${report.length} image variants. No retouching, cropping, or attribution removal.`,
);
