import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Seed Users
  const userAlice = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      email: 'alice@example.com',
      password: 'aliceSecurePassword',
      profile: {
        create: {
          reasonToQuit: 'Health reasons',
          imgUrl: 'https://example.com/alice.jpg',
          userName: 'Alice',
        },
      },
    },
  });

  const userBob = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      email: 'bob@example.com',
      password: 'bobSecurePassword',
      profile: {
        create: {
          reasonToQuit: 'Costly habit',
          imgUrl: 'https://example.com/bob.jpg',
          userName: 'Bob',
        },
      },
    },
  });

  // Seed Posts
  await prisma.post.create({
    data: {
      content: 'Trying to quit smoking!',
      isPublic: true,
      authorId: userAlice.id,
    },
  });

  await prisma.post.create({
    data: {
      content: 'It has been a tough journey!',
      isPublic: true,
      authorId: userBob.id,
    },
  });

  // Seed Vapes
  const vape = await prisma.vape.create({
    data: {
      price: 49.99,
      brand: 'VapeBrand',
      productType: 'Disposable',
      nicotineContent: 50,
      puffsCount: 500,
    },
  });

  // Seed PuffLogs
  await prisma.puffLog.create({
    data: {
      nicotineIntake: vape.nicotineContent / vape.puffsCount,
      vapeId: vape.id,
      userId: userAlice.id,
    },
  });

  // Seed PurchaseLogs
  await prisma.purchaseLog.create({
    data: {
      totalCost: 49.99,
      quantity: 1,
      userId: userAlice.id,
    },
  });

  console.log('Seed data created!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
