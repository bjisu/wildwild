import sharp from "sharp";
import { readdir, stat, unlink } from "node:fs/promises";
import { join, extname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const IMAGES_DIR = fileURLToPath(new URL("../public/images", import.meta.url));
const QUALITY = 80;
const SUPPORTED = new Set([".png", ".jpg", ".jpeg"]);

async function processDir(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      await processDir(fullPath);
    } else if (SUPPORTED.has(extname(entry.name).toLowerCase())) {
      const webpPath = join(dir, basename(entry.name, extname(entry.name)) + ".webp");
      await sharp(fullPath).webp({ quality: QUALITY }).toFile(webpPath);
      const [before, after] = await Promise.all([stat(fullPath), stat(webpPath)]);
      const saved = (((before.size - after.size) / before.size) * 100).toFixed(1);
      console.log(
        `✓ ${entry.name} → ${basename(webpPath)}  ${(before.size / 1024).toFixed(1)}KB → ${(after.size / 1024).toFixed(1)}KB  (-${saved}%)`
      );
      await unlink(fullPath);
    }
  }
}

const before = await readdir(IMAGES_DIR);
const targets = before.filter((f) => SUPPORTED.has(extname(f).toLowerCase()));

if (targets.length === 0) {
  console.log("변환할 PNG/JPG 파일이 없습니다.");
  process.exit(0);
}

console.log(`PNG/JPG ${targets.length}개 변환 시작...\n`);
await processDir(IMAGES_DIR);
console.log("\n완료!");
