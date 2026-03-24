import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PrismaClient } from "@prisma/client";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appRoot = path.resolve(__dirname, "..");
const schemaPath = path.join(appRoot, "prisma", "schema.prisma");
const serverPath = path.join(appRoot, ".next", "standalone", "apps", "okami-ramen", "server.js");
const prismaBin = path.join(appRoot, "node_modules", ".bin", process.platform === "win32" ? "prisma.cmd" : "prisma");
const seedScriptPath = path.join(appRoot, "scripts", "seed-database.mjs");

function runCommand(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: appRoot,
      stdio: "inherit",
      shell: false,
    });

    child.on("exit", (code, signal) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`Command failed: ${command} ${args.join(" ")} (code=${code ?? "null"}, signal=${signal ?? "none"})`));
    });

    child.on("error", reject);
  });
}

async function shouldSeedDatabase() {
  const prisma = new PrismaClient();

  try {
    const [userCount, categoryCount] = await Promise.all([
      prisma.user.count(),
      prisma.category.count(),
    ]);

    return userCount === 0 || categoryCount === 0;
  } finally {
    await prisma.$disconnect();
  }
}

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required before starting Okami Ramen.");
  }

  if (!process.env.AUTH_SECRET && !process.env.NEXTAUTH_SECRET) {
    throw new Error("AUTH_SECRET or NEXTAUTH_SECRET is required before starting Okami Ramen.");
  }

  console.log("[bootstrap] Applying Prisma migrations...");
  await runCommand(prismaBin, ["migrate", "deploy", "--schema", schemaPath]);

  if (await shouldSeedDatabase()) {
    console.log("[bootstrap] Database is empty. Seeding demo content...");
    await runCommand(process.execPath, [seedScriptPath]);
  } else {
    console.log("[bootstrap] Database already initialized. Skipping seed.");
  }

  console.log("[bootstrap] Starting Next.js server...");
  const server = spawn(process.execPath, [serverPath], {
    cwd: appRoot,
    stdio: "inherit",
    env: {
      ...process.env,
      HOSTNAME: process.env.HOSTNAME || "0.0.0.0",
    },
  });

  const forwardSignal = (signal) => {
    if (!server.killed) {
      server.kill(signal);
    }
  };

  process.on("SIGINT", forwardSignal);
  process.on("SIGTERM", forwardSignal);

  server.on("exit", (code, signal) => {
    if (signal) {
      process.kill(process.pid, signal);
      return;
    }

    process.exit(code ?? 0);
  });

  server.on("error", (error) => {
    console.error(error);
    process.exit(1);
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
