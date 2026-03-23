import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Known IDs for idempotent upsert
const ADMIN_ID = "user_admin_okami";
const CATEGORY_IDS = {
  ramen: "cat_ramen",
  starters: "cat_starters",
  sides: "cat_sides",
  drinks: "cat_drinks",
};

const ITEM_IDS = [
  "item_01", "item_02", "item_03", "item_04", "item_05",
  "item_06", "item_07", "item_08", "item_09", "item_10",
  "item_11", "item_12", "item_13", "item_14", "item_15",
  "item_16", "item_17", "item_18", "item_19", "item_20",
];

function joinIngredients(ingredients: string[]) {
  return ingredients.join("\n");
}

async function main() {
  console.log("🌱 Seeding Okami Ramen database...");

  // Admin user
  const passwordHash = await bcrypt.hash("demo123", 10);
  await prisma.user.upsert({
    where: { id: ADMIN_ID },
    update: { passwordHash, email: "admin@okami.app" },
    create: {
      id: ADMIN_ID,
      email: "admin@okami.app",
      name: "Okami Admin",
      passwordHash,
    },
  });

  // Categories
  await prisma.category.upsert({
    where: { id: CATEGORY_IDS.ramen },
    update: { name: "Signature Ramen", order: 1 },
    create: { id: CATEGORY_IDS.ramen, name: "Signature Ramen", order: 1 },
  });
  await prisma.category.upsert({
    where: { id: CATEGORY_IDS.starters },
    update: { name: "Starters", order: 2 },
    create: { id: CATEGORY_IDS.starters, name: "Starters", order: 2 },
  });
  await prisma.category.upsert({
    where: { id: CATEGORY_IDS.sides },
    update: { name: "Rice & Sides", order: 3 },
    create: { id: CATEGORY_IDS.sides, name: "Rice & Sides", order: 3 },
  });
  await prisma.category.upsert({
    where: { id: CATEGORY_IDS.drinks },
    update: { name: "Drinks", order: 4 },
    create: { id: CATEGORY_IDS.drinks, name: "Drinks", order: 4 },
  });

  // Menu items: 8 ramen, 5 starters, 4 sides, 3 drinks = 20 total
  const items = [
    // Signature Ramen (8)
    {
      id: ITEM_IDS[0],
      name: "Tonkotsu Black",
      description: "20-hour pork bone broth, chashu pork, black garlic oil, soft-boiled egg, bamboo shoots, nori",
      ingredients: joinIngredients(["Pork bone broth", "Chashu pork", "Black garlic oil", "Soft-boiled egg", "Bamboo shoots", "Nori", "House noodles"]),
      price: 18.5,
      categoryId: CATEGORY_IDS.ramen,
      imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80",
      available: true,
    },
    {
      id: ITEM_IDS[1],
      name: "Spicy Miso Okami",
      description: "House miso blend, sesame chili paste, ground pork, corn, butter, green onions",
      ingredients: joinIngredients(["House miso broth", "Sesame chili paste", "Ground pork", "Sweet corn", "Butter", "Green onions", "House noodles"]),
      price: 17.5,
      categoryId: CATEGORY_IDS.ramen,
      imageUrl: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=600&q=80",
      available: true,
    },
    {
      id: ITEM_IDS[2],
      name: "Shoyu Classic",
      description: "Clear chicken-soy broth, thinly sliced chicken, menma, narutomaki, scallions",
      ingredients: joinIngredients(["Chicken-soy broth", "Sliced chicken", "Menma", "Narutomaki", "Scallions", "House noodles"]),
      price: 16.0,
      categoryId: CATEGORY_IDS.ramen,
      imageUrl: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&q=80",
      available: true,
    },
    {
      id: ITEM_IDS[3],
      name: "Shio Yuzu",
      description: "Delicate salt broth with yuzu zest, poached chicken, crispy shallots, fresh herbs",
      ingredients: joinIngredients(["Salt broth", "Yuzu zest", "Poached chicken", "Crispy shallots", "Fresh herbs", "House noodles"]),
      price: 17.0,
      categoryId: CATEGORY_IDS.ramen,
      imageUrl: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=600&q=80",
      available: true,
    },
    {
      id: ITEM_IDS[4],
      name: "Vegan Shoyu",
      description: "Kombu-shiitake dashi, soy tare, roasted tofu, bok choy, mushrooms, sesame oil",
      ingredients: joinIngredients(["Kombu-shiitake dashi", "Soy tare", "Roasted tofu", "Bok choy", "Mixed mushrooms", "Sesame oil", "House noodles"]),
      price: 16.5,
      categoryId: CATEGORY_IDS.ramen,
      imageUrl: "https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=600&q=80",
      available: true,
    },
    {
      id: ITEM_IDS[5],
      name: "Tantanmen",
      description: "Sichuan-style sesame broth, spiced ground pork, bok choy, chili oil, crushed peanuts",
      ingredients: joinIngredients(["Sesame broth", "Spiced ground pork", "Bok choy", "Chili oil", "Crushed peanuts", "House noodles"]),
      price: 18.0,
      categoryId: CATEGORY_IDS.ramen,
      imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80",
      available: true,
    },
    {
      id: ITEM_IDS[6],
      name: "Karikabu Tsukemen",
      description: "Thick noodles served cold, rich dipping broth with pork belly and katsuobushi",
      ingredients: joinIngredients(["Thick noodles", "Rich pork dipping broth", "Pork belly", "Katsuobushi", "Scallions", "Ajitama egg"]),
      price: 19.0,
      categoryId: CATEGORY_IDS.ramen,
      imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80",
      available: false,
    },
    {
      id: ITEM_IDS[7],
      name: "Midnight Tonkotsu",
      description: "Double-rich pork broth, black sesame paste, slow-cooked chashu, crispy pork rinds",
      ingredients: joinIngredients(["Double-rich pork broth", "Black sesame paste", "Slow-cooked chashu", "Crispy pork rinds", "Wood ear mushrooms", "House noodles"]),
      price: 20.0,
      categoryId: CATEGORY_IDS.ramen,
      imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80",
      available: true,
    },
    // Starters (5)
    {
      id: ITEM_IDS[8],
      name: "Gyoza (6 pcs)",
      description: "Pan-fried pork and cabbage dumplings, ponzu dipping sauce",
      ingredients: joinIngredients(["Pork filling", "Cabbage", "Garlic", "Ginger", "Gyoza wrappers", "Ponzu sauce"]),
      price: 9.0,
      categoryId: CATEGORY_IDS.starters,
      imageUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80",
      available: true,
    },
    {
      id: ITEM_IDS[9],
      name: "Karaage",
      description: "Japanese fried chicken, twice-fried, kewpie mayo, lemon wedge, shichimi",
      ingredients: joinIngredients(["Chicken thigh", "Soy marinade", "Ginger", "Potato starch", "Kewpie mayo", "Lemon wedge", "Shichimi"]),
      price: 10.5,
      categoryId: CATEGORY_IDS.starters,
      imageUrl: "https://images.unsplash.com/photo-1562802378-063ec186a863?w=600&q=80",
      available: true,
    },
    {
      id: ITEM_IDS[10],
      name: "Takoyaki (4 pcs)",
      description: "Osaka-style octopus balls, bonito flakes, okonomiyaki sauce, aonori",
      ingredients: joinIngredients(["Takoyaki batter", "Octopus", "Bonito flakes", "Okonomiyaki sauce", "Aonori", "Kewpie mayo"]),
      price: 8.5,
      categoryId: CATEGORY_IDS.starters,
      imageUrl: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&q=80",
      available: true,
    },
    {
      id: ITEM_IDS[11],
      name: "Agedashi Tofu",
      description: "Lightly fried silken tofu, dashi broth, grated daikon, katsuobushi",
      ingredients: joinIngredients(["Silken tofu", "Potato starch", "Dashi broth", "Grated daikon", "Katsuobushi", "Scallions"]),
      price: 8.0,
      categoryId: CATEGORY_IDS.starters,
      imageUrl: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=600&q=80",
      available: true,
    },
    {
      id: ITEM_IDS[12],
      name: "Edamame",
      description: "Salted edamame with mentaiko butter and chili flakes",
      ingredients: joinIngredients(["Edamame", "Sea salt", "Mentaiko butter", "Chili flakes"]),
      price: 5.5,
      categoryId: CATEGORY_IDS.starters,
      imageUrl: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600&q=80",
      available: true,
    },
    // Rice & Sides (4)
    {
      id: ITEM_IDS[13],
      name: "Chashu Rice",
      description: "Steamed rice topped with braised pork belly, soft egg, pickled ginger",
      ingredients: joinIngredients(["Steamed rice", "Braised pork belly", "Soft egg", "Pickled ginger", "Sesame seeds", "Scallions"]),
      price: 9.0,
      categoryId: CATEGORY_IDS.sides,
      imageUrl: "https://images.unsplash.com/photo-1512003867696-6d5ce6835040?w=600&q=80",
      available: true,
    },
    {
      id: ITEM_IDS[14],
      name: "Extra Chashu (3 pcs)",
      description: "Three slices of 12-hour soy-braised pork belly",
      ingredients: joinIngredients(["Soy-braised pork belly", "Soy glaze", "Scallions"]),
      price: 6.5,
      categoryId: CATEGORY_IDS.sides,
      imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
      available: true,
    },
    {
      id: ITEM_IDS[15],
      name: "Soft-Boiled Egg (2 pcs)",
      description: "Soy-marinated soft eggs, jammy centre, served with sea salt",
      ingredients: joinIngredients(["Eggs", "Soy marinade", "Mirin", "Sea salt"]),
      price: 4.5,
      categoryId: CATEGORY_IDS.sides,
      imageUrl: "https://images.unsplash.com/photo-1505576391880-b3f9d713dc4f?w=600&q=80",
      available: true,
    },
    {
      id: ITEM_IDS[16],
      name: "Noodle Refill",
      description: "Extra serving of house-made ramen noodles",
      ingredients: joinIngredients(["House-made ramen noodles"]),
      price: 3.0,
      categoryId: CATEGORY_IDS.sides,
      imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80",
      available: true,
    },
    // Drinks (3)
    {
      id: ITEM_IDS[17],
      name: "Ramune Soda",
      description: "Classic Japanese marble-sealed soda — original, strawberry, or melon",
      ingredients: joinIngredients(["Carbonated water", "Sugar", "Natural flavoring"]),
      price: 4.0,
      categoryId: CATEGORY_IDS.drinks,
      imageUrl: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80",
      available: true,
    },
    {
      id: ITEM_IDS[18],
      name: "Japanese Craft Beer",
      description: "Rotating selection of Japanese craft ales and lagers (330ml)",
      ingredients: joinIngredients(["Malted barley", "Hops", "Yeast", "Water"]),
      price: 7.5,
      categoryId: CATEGORY_IDS.drinks,
      imageUrl: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=600&q=80",
      available: true,
    },
    {
      id: ITEM_IDS[19],
      name: "Matcha Latte",
      description: "Ceremonial grade matcha, steamed oat milk, light honey",
      ingredients: joinIngredients(["Ceremonial grade matcha", "Oat milk", "Light honey"]),
      price: 5.5,
      categoryId: CATEGORY_IDS.drinks,
      imageUrl: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&q=80",
      available: true,
    },
  ];

  for (const item of items) {
    await prisma.menuItem.upsert({
      where: { id: item.id },
      update: {
        name: item.name,
        description: item.description,
        ingredients: item.ingredients,
        price: item.price,
        imageUrl: item.imageUrl,
        available: item.available,
        categoryId: item.categoryId,
      },
      create: item,
    });
  }

  console.log("✅ Seed complete — 1 user, 4 categories, 20 dishes");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
