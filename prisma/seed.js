const prisma = require("../prisma");

async function main() {
  for (let i = 1; i <= 10; i++) {
    await prisma.puppy.upsert({
      where: { id: i },
      update: {},
      create: {
        name: `Puppy ${i}`,
        breed: `Breed${i % 3}`,
      },
    });
  }
  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
