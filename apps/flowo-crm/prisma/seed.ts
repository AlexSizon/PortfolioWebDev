import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Fixed seed for determinism
faker.seed(42);

const STAGES = ["Leads", "Qualified", "Proposal", "Negotiation", "Won", "Lost"] as const;
const PRIORITIES = ["High", "Medium", "Low"] as const;
const TAGS_POOL = [
  "VIP",
  "Agency",
  "E-commerce",
  "Startup",
  "Enterprise",
  "Referral",
  "Recurring",
  "Design",
  "Development",
];
const ACTIVITY_TYPES = ["note", "call", "email", "meeting", "deal_updated"] as const;

function randomFrom<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

function randomTags(): string[] {
  const count = Math.floor(Math.random() * 3) + 1;
  const shuffled = [...TAGS_POOL].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function daysAgo(days: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d;
}

async function main() {
  console.log("🌱 Starting seed...");

  // Truncate all tables
  await prisma.activity.deleteMany();
  await prisma.task.deleteMany();
  await prisma.deal.deleteMany();
  await prisma.client.deleteMany();
  await prisma.user.deleteMany();

  // Create demo user
  const hashedPassword = await bcrypt.hash("demo123", 12);
  await prisma.user.create({
    data: {
      id: "demo-user-id",
      email: "demo@flowo.app",
      password: hashedPassword,
      name: "Demo User",
      role: "demo",
    },
  });
  console.log("✓ Created demo user");

  // Create 20 clients
  const clients = [];
  for (let i = 0; i < 20; i++) {
    const tags = randomTags();
    const client = await prisma.client.create({
      data: {
        id: `client-${i + 1}`,
        name: faker.person.fullName(),
        company: faker.company.name(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        tags: JSON.stringify(tags),
        notes: faker.lorem.sentence(),
        createdAt: daysAgo(Math.floor(Math.random() * 90)),
      },
    });
    clients.push(client);
  }
  console.log(`✓ Created ${clients.length} clients`);

  // Create 24 deals distributed across 6 stages (4 per stage)
  const deals = [];
  for (let stageIdx = 0; stageIdx < STAGES.length; stageIdx++) {
    for (let j = 0; j < 4; j++) {
      const dealIdx = stageIdx * 4 + j;
      const client = clients[dealIdx % clients.length]!;
      const createdDaysAgo = Math.floor(Math.random() * 85) + 5;
      const deal = await prisma.deal.create({
        data: {
          id: `deal-${dealIdx + 1}`,
          title: `${faker.commerce.productAdjective()} ${faker.commerce.department()} Project`,
          value: parseFloat(
            (Math.floor(Math.random() * 50) * 1000 + 5000).toFixed(2)
          ),
          stage: STAGES[stageIdx]!,
          priority: randomFrom(PRIORITIES),
          clientId: client.id,
          createdAt: daysAgo(createdDaysAgo),
        },
      });
      deals.push(deal);
    }
  }
  console.log(`✓ Created ${deals.length} deals`);

  // Create 35 tasks
  for (let i = 0; i < 35; i++) {
    const client = clients[i % clients.length]!;
    const linkedDeal = deals[i % deals.length];
    const dueInDays = Math.floor(Math.random() * 30) - 5; // from 5 days ago to 25 ahead
    await prisma.task.create({
      data: {
        id: `task-${i + 1}`,
        title: faker.hacker.phrase(),
        dueDate: daysAgo(-dueInDays),
        priority: randomFrom(PRIORITIES),
        done: Math.random() > 0.7,
        clientId: client.id,
        dealId: Math.random() > 0.5 ? linkedDeal!.id : null,
        createdAt: daysAgo(Math.floor(Math.random() * 30)),
      },
    });
  }
  console.log("✓ Created 35 tasks");

  // Create 90 days of activity events (~2-4 per day = ~270 events, spread across clients)
  const activitiesPerDay = 3;
  for (let day = 0; day < 90; day++) {
    for (let a = 0; a < activitiesPerDay; a++) {
      const client = clients[Math.floor(Math.random() * clients.length)]!;
      const type = randomFrom(ACTIVITY_TYPES);
      const descriptions: Record<(typeof ACTIVITY_TYPES)[number], string> = {
        note: faker.lorem.sentence(),
        call: `Called ${client.name} - ${faker.lorem.words(5)}`,
        email: `Sent proposal email to ${client.company}`,
        meeting: `Meeting with ${client.name} at ${faker.location.city()}`,
        deal_updated: `Deal moved to ${randomFrom(STAGES)}`,
      };
      await prisma.activity.create({
        data: {
          type,
          description: descriptions[type],
          clientId: client.id,
          createdAt: daysAgo(day),
        },
      });
    }
  }
  console.log("✓ Created 90 days of activity events");

  console.log("🌱 Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
