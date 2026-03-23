import { cpSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appRoot = path.resolve(__dirname, "..");

const sourceStaticDir = path.join(appRoot, ".next", "static");
const targetNextDir = path.join(appRoot, ".next", "standalone", "apps", "okami-ramen", ".next");
const targetStaticDir = path.join(targetNextDir, "static");

if (!existsSync(sourceStaticDir)) {
  console.warn("[prepare-standalone] No .next/static directory found, skipping copy.");
  process.exit(0);
}

mkdirSync(targetNextDir, { recursive: true });
cpSync(sourceStaticDir, targetStaticDir, { recursive: true, force: true });

console.log("[prepare-standalone] Copied .next/static into standalone output.");
