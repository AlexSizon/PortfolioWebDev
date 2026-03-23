import bcrypt from "bcryptjs";
import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

const demoUser = {
  id: "demo-user-id",
  email: "demo@flowo.app",
  password: "demo123",
  name: "Demo User",
  role: "demo",
};

const clients = [
  {
    id: "client-1",
    name: "Emma Laurent",
    company: "Nord Atelier",
    email: "emma@nordatelier.com",
    phone: "+33 6 11 22 33 44",
    tags: JSON.stringify(["Design", "Recurring"]),
    notes: "Wants a premium editorial landing page.",
  },
  {
    id: "client-2",
    name: "Daniel Park",
    company: "Flowline Studio",
    email: "daniel@flowline.studio",
    phone: "+1 415 555 0142",
    tags: JSON.stringify(["Agency", "VIP"]),
    notes: "Interested in CRM customization and automations.",
  },
  {
    id: "client-3",
    name: "Sofia Nguyen",
    company: "Luma Commerce",
    email: "sofia@lumacommerce.co",
    phone: "+44 20 7946 0123",
    tags: JSON.stringify(["E-commerce", "Development"]),
    notes: "Needs conversion-focused redesign support.",
  },
];

const deals = [
  {
    id: "deal-1",
    title: "Nord Atelier Website Refresh",
    value: 12000,
    stage: "Proposal",
    priority: "High",
    clientId: "client-1",
  },
  {
    id: "deal-2",
    title: "Flowline CRM Rollout",
    value: 18500,
    stage: "Negotiation",
    priority: "Medium",
    clientId: "client-2",
  },
  {
    id: "deal-3",
    title: "Luma Commerce CRO Sprint",
    value: 9000,
    stage: "Qualified",
    priority: "High",
    clientId: "client-3",
  },
];

const tasks = [
  {
    id: "task-1",
    title: "Send proposal deck to Nord Atelier",
    priority: "High",
    done: false,
    clientId: "client-1",
    dealId: "deal-1",
  },
  {
    id: "task-2",
    title: "Prepare onboarding checklist for Flowline",
    priority: "Medium",
    done: false,
    clientId: "client-2",
    dealId: "deal-2",
  },
  {
    id: "task-3",
    title: "Review analytics baseline with Luma Commerce",
    priority: "Medium",
    done: true,
    clientId: "client-3",
    dealId: "deal-3",
  },
];

const activities = [
  {
    id: "activity-1",
    type: "email",
    description: "Sent proposal email to Nord Atelier",
    clientId: "client-1",
  },
  {
    id: "activity-2",
    type: "meeting",
    description: "Discovery meeting with Flowline Studio",
    clientId: "client-2",
  },
  {
    id: "activity-3",
    type: "deal_updated",
    description: "Deal moved to Qualified",
    clientId: "client-3",
  },
];

async function ensureDemoData() {
  const existingUser = await prisma.user.findUnique({
    where: { email: demoUser.email },
  });

  if (existingUser) {
    return;
  }

  const hashedPassword = await bcrypt.hash(demoUser.password, 12);

  await prisma.user.create({
    data: {
      id: demoUser.id,
      email: demoUser.email,
      password: hashedPassword,
      name: demoUser.name,
      role: demoUser.role,
    },
  });

  for (const client of clients) {
    await prisma.client.upsert({
      where: { id: client.id },
      update: client,
      create: client,
    });
  }

  for (const deal of deals) {
    await prisma.deal.upsert({
      where: { id: deal.id },
      update: deal,
      create: deal,
    });
  }

  for (const task of tasks) {
    await prisma.task.upsert({
      where: { id: task.id },
      update: task,
      create: task,
    });
  }

  for (const activity of activities) {
    await prisma.activity.upsert({
      where: { id: activity.id },
      update: activity,
      create: activity,
    });
  }
}

ensureDemoData()
  .catch((error) => {
    console.error("Bootstrap failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
