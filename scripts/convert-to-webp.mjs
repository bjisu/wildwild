import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import { join, extname, basename } from "path";

const INPUT_DIR = "public/images";
const QUALITY = 80;
const SUPPORTED = new Set([".png", ".jpg", ".jpeg"]);

async function getImageFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await getImageFiles(fullPath)));
    } else if (SUPPORTED.has(extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }

  return files;
}

async function convertToWebp(inputPath) {
  const webpPath = inputPath.replace(/\.(png|jpe?g)$/i, ".webp");
  await sharp(inputPath).webp({ quality: QUALITY }).toFile(webpPath);

  const [before, after] = await Promise.all([stat(inputPath), stat(webpPath)]);
  const saved = (((before.size - after.size) / before.size) * 100).toFixed(1);

  console.log(
    `✓ ${basename(inputPath)} → ${basename(webpPath)}  ${(before.size / 1024).toFixed(1)}KB → ${(after.size / 1024).toFixed(1)}KB  (-${saved}%)`
  );
}

const files = await getImageFiles(INPUT_DIR);

if (files.length === 0) {
  console.log("변환할 PNG/JPG 파일이 없습니다.");
  process.exit(0);
}

console.log(`PNG/JPG ${files.length}개 변환 시작...\n`);

for (const file of files) {
  await convertToWebp(file);
}

console.log("\n완료!");
