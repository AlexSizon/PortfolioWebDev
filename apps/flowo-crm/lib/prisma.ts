import fs from "node:fs";
import path from "node:path";
import { PrismaClient } from "@/generated/prisma";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function resolveDatasourceUrl() {
  const datasourceUrl = process.env.DATABASE_URL;

  if (!datasourceUrl?.startsWith("file:")) {
    return datasourceUrl;
  }

  const rawPath = datasourceUrl.slice("file:".length);
  const [relativePathPart, query = ""] = rawPath.split("?");
  const relativePath = relativePathPart ?? "";

  if (!relativePath.startsWith(".")) {
    return datasourceUrl;
  }

  const dbFileName = path.basename(relativePath);
  const candidates = new Set<string>();

  for (let depth = 0; depth <= 6; depth += 1) {
    const baseDir =
      depth === 0
        ? process.cwd()
        : path.resolve(process.cwd(), ...Array.from({ length: depth }, () => ".."));

    candidates.add(path.resolve(baseDir, relativePath));
    candidates.add(path.resolve(baseDir, "prisma", dbFileName));
    candidates.add(path.resolve(baseDir, "apps", "flowo-crm", "prisma", dbFileName));
  }

  const resolvedPath = [...candidates].find((candidate) => fs.existsSync(candidate));

  if (!resolvedPath) {
    return datasourceUrl;
  }

  const normalizedPath = resolvedPath.replace(/\\/g, "/");
  return `file:${normalizedPath}${query ? `?${query}` : ""}`;
}

const datasourceUrl = resolveDatasourceUrl();

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    ...(datasourceUrl ? { datasources: { db: { url: datasourceUrl } } } : {}),
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
