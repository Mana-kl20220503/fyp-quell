import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

async function main() {
  // Seed Users

  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync('qwe123', salt);

  const userAlice = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      email: 'alice@example.com',
      password: hash,
      profile: {
        create: {
          reasonToQuit: 'Health reasons',
          imgUrl: 'alice.jpg',
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
      password: hash,
      profile: {
        create: {
          reasonToQuit: 'Costly habit',
          imgUrl: 'bob.jpg',
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
  const vape2 = await prisma.vape.create({
    data: {
      price: 65,
      brand: 'Lost Mary',
      productType: 'Vape Kit',
      nicotineContent: 70,
      puffsCount: 700,
    },
  });
  const vape3 = await prisma.vape.create({
    data: {
      price: 15,
      brand: 'ELFBAR',
      productType: 'Pod',
      nicotineContent: 25,
      puffsCount: 250,
    },
  });
  const vape4 = await prisma.vape.create({
    data: {
      price: 20,
      brand: 'ELUX',
      productType: 'Pod',
      nicotineContent: 18,
      puffsCount: 180,
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
      totalCost: 1 * vape.price,
      quantity: 1,
      user: {
        connect: {
          id: userAlice.id,
        },
      },
      vape: {
        connect: {
          id: vape.id,
        },
      },
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
