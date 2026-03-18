import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, '../public');

async function generateIcons() {
  // Generate favicon-32x32.png from favicon.svg
  const faviconSvg = readFileSync(resolve(publicDir, 'favicon.svg'));
  await sharp(faviconSvg)
    .resize(32, 32)
    .png()
    .toFile(resolve(publicDir, 'favicon-32x32.png'));
  console.log('Created favicon-32x32.png');

  // Generate favicon-16x16.png
  await sharp(faviconSvg)
    .resize(16, 16)
    .png()
    .toFile(resolve(publicDir, 'favicon-16x16.png'));
  console.log('Created favicon-16x16.png');

  // Generate favicon.ico (32x32 PNG wrapped — browsers accept PNG-based ICOs)
  const ico32 = await sharp(faviconSvg)
    .resize(32, 32)
    .png()
    .toBuffer();
  // Create a simple ICO file with a single 32x32 PNG image
  const icoHeader = Buffer.alloc(6);
  icoHeader.writeUInt16LE(0, 0);     // reserved
  icoHeader.writeUInt16LE(1, 2);     // ICO type
  icoHeader.writeUInt16LE(1, 4);     // 1 image

  const dirEntry = Buffer.alloc(16);
  dirEntry.writeUInt8(32, 0);        // width
  dirEntry.writeUInt8(32, 1);        // height
  dirEntry.writeUInt8(0, 2);         // color palette
  dirEntry.writeUInt8(0, 3);         // reserved
  dirEntry.writeUInt16LE(1, 4);      // color planes
  dirEntry.writeUInt16LE(32, 6);     // bits per pixel
  dirEntry.writeUInt32LE(ico32.length, 8);  // size of image data
  dirEntry.writeUInt32LE(22, 12);    // offset to image data

  writeFileSync(resolve(publicDir, 'favicon.ico'), Buffer.concat([icoHeader, dirEntry, ico32]));
  console.log('Created favicon.ico');

  // Generate icon-192x192.png from icon-192x192.svg
  const icon192Svg = readFileSync(resolve(publicDir, 'icon-192x192.svg'));
  await sharp(icon192Svg)
    .resize(192, 192)
    .png()
    .toFile(resolve(publicDir, 'icon-192x192.png'));
  console.log('Created icon-192x192.png');

  // Generate icon-512x512.png from icon-512x512.svg
  const icon512Svg = readFileSync(resolve(publicDir, 'icon-512x512.svg'));
  await sharp(icon512Svg)
    .resize(512, 512)
    .png()
    .toFile(resolve(publicDir, 'icon-512x512.png'));
  console.log('Created icon-512x512.png');

  // Generate apple-touch-icon.png (180x180) from apple-touch-icon.svg
  const appleSvg = readFileSync(resolve(publicDir, 'apple-touch-icon.svg'));
  await sharp(appleSvg)
    .resize(180, 180)
    .png()
    .toFile(resolve(publicDir, 'apple-touch-icon.png'));
  console.log('Created apple-touch-icon.png');

  // Generate og-image.png (1200x630) from og-image.svg
  const ogSvg = readFileSync(resolve(publicDir, 'og-image.svg'));
  await sharp(ogSvg)
    .resize(1200, 630)
    .png()
    .toFile(resolve(publicDir, 'og-image.png'));
  console.log('Created og-image.png');

  console.log('\nAll icons generated successfully!');
}

generateIcons().catch(console.error);
