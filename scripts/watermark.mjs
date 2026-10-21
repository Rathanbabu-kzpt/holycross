// Burns a "Holy Cross High School" watermark into every photo.
//
//   photos-original/*.jpg  (clean originals — NOT served to the public)
//        ↓  npm run watermark
//   public/images/*.jpg    (watermarked copies used by the website)
//
// To add or replace a photo: put the clean file in photos-original/ (same file name the site uses),
// then run `npm run watermark`.
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.dirname(path.dirname(new URL(import.meta.url).pathname));
const SRC = path.join(root, "photos-original");
const OUT = path.join(root, "public", "images");
const LOGO = path.join(root, "public", "brand", "logo-512.png");
const TEXT = "HOLY CROSS HIGH SCHOOL · GHANPUR (STN.)";

/** Diagonal repeating text across the whole photo. */
function tileSvg(w, h) {
  const size = Math.max(14, Math.round(w / 55));
  const gapX = size * 26;
  const gapY = size * 7;
  const rows = [];
  for (let y = -h; y < h * 2; y += gapY) {
    for (let x = -w + ((y / gapY) % 2) * (gapX / 2); x < w * 2; x += gapX) {
      rows.push(`<text x="${x}" y="${y}">${TEXT}</text>`);
    }
  }
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <g transform="rotate(-28 ${w / 2} ${h / 2})" font-family="Helvetica, Arial, sans-serif" font-weight="700"
     font-size="${size}" letter-spacing="${size * 0.15}" fill="#ffffff" fill-opacity="0.16"
     stroke="#0b1437" stroke-opacity="0.10" stroke-width="${size * 0.04}">
    ${rows.join("\n    ")}
  </g>
</svg>`);
}

/** Crest + name badge in the bottom-right corner. */
async function badge(w) {
  const logoSize = Math.round(Math.max(36, w * 0.05));
  const font = Math.round(logoSize * 0.38);
  const textW = Math.round(font * 12.5);
  const pad = Math.round(logoSize * 0.18);
  const bw = logoSize + textW + pad * 3;
  const bh = logoSize + pad * 2;
  const logo = await sharp(LOGO).resize(logoSize, logoSize).png().toBuffer();
  const plate = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${bw}" height="${bh}">
  <rect width="${bw}" height="${bh}" rx="${bh / 2}" fill="#0b1437" fill-opacity="0.55"/>
  <text x="${logoSize + pad * 2}" y="${bh / 2 + font * 0.36}" font-family="Helvetica, Arial, sans-serif"
        font-size="${font}" font-weight="700" fill="#ffffff" fill-opacity="0.9">© Holy Cross High School</text>
</svg>`);
  const img = await sharp(plate).composite([{ input: logo, left: pad, top: pad }]).png().toBuffer();
  return { img, bw, bh };
}

await mkdir(OUT, { recursive: true });
const files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
for (const f of files) {
  const src = sharp(path.join(SRC, f));
  const { width: w, height: h } = await src.metadata();
  const { img, bw, bh } = await badge(w);
  const margin = Math.round(w * 0.02);
  await src
    .composite([
      { input: tileSvg(w, h), left: 0, top: 0 },
      { input: img, left: w - bw - margin, top: h - bh - margin },
    ])
    .jpeg({ quality: 80, mozjpeg: true })
    .withMetadata({ exif: { IFD0: { Copyright: "Holy Cross High School, Ghanpur (Stn.)" } } })
    .toFile(path.join(OUT, f.replace(/\.(png|webp)$/i, ".jpg")));
  console.log("watermarked", f);
}
console.log(`done — ${files.length} photos`);
