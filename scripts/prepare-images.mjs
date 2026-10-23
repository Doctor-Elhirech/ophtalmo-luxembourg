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
const imageWidths = [480, 640, 800, 960, 1600];
for (const [slot, source] of Object.entries(slots)) {
  const file = `Photos/${source}`;
  const metadata = await sharp(file).metadata();
  slotMetadata[slot] = {
    base: slot,
    width: metadata.width,
    height: metadata.height,
    avif: slot === 'street-reference' || slot === 'exterior',
  };
  for (const size of imageWidths) {
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
  if (slotMetadata[slot].avif) {
    const widths = imageWidths.filter(
      (size, index) =>
        index === 0 ||
        Math.min(size, metadata.width) > Math.min(imageWidths[index - 1], metadata.width),
    );
    for (const size of widths) {
      const output = `public/images/${slot}-${size}.avif`;
      const info = await sharp(file)
        .rotate()
        .resize({ width: size, withoutEnlargement: true })
        .avif({ quality: 55, effort: 6 })
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
}
// Keep the newer entrance reference intact; CSS fits it to each layout's
// existing photo frame without modifying the source image.
const entranceMetadata = await sharp('Photos/Img-7.png').metadata();
slotMetadata['entrance-detail'] = {
  base: 'entrance-detail',
  width: entranceMetadata.width,
  height: entranceMetadata.height,
};
const entranceOutput = 'public/images/entrance-detail.webp';
const entranceInfo = await sharp('Photos/Img-7.png')
  .rotate()
  .webp({ quality: 88, effort: 5 })
  .toFile(entranceOutput);
report.push({
  slot: 'entrance-detail',
  source: 'Img-7.png',
  output: entranceOutput,
  width: entranceInfo.width,
  height: entranceInfo.height,
  bytes: entranceInfo.size,
  originalWidth: entranceMetadata.width,
});
await writeFile('public/images/manifest.json', JSON.stringify(report, null, 2) + '\n');
await writeFile('src/config/image-metadata.json', JSON.stringify(slotMetadata, null, 2) + '\n');
console.log(
  `Prepared ${report.length} image variants. No retouching, cropping, or attribution removal.`,
);
