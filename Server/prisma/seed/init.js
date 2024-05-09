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
          reasonToQuit:
            'I decided to quit vaping to improve my lung health and increase my overall fitness level.',
          imgUrl: 'Alice.jbg',
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
          imgUrl: 'Bob.jpg',
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
      price: 11,
      brand: 'Crystal Pro',
      productType: 'Disposable',
      nicotineContent: 20,
      puffsCount: 4000,
    },
  });
  const vape2 = await prisma.vape.create({
    data: {
      price: 5,
      brand: 'Lost Mary',
      productType: 'Vape Kit',
      nicotineContent: 20,
      puffsCount: 600,
    },
  });
  const vape3 = await prisma.vape.create({
    data: {
      price: 7,
      brand: 'ELFBAR',
      productType: 'Pod',
      nicotineContent: 20,
      puffsCount: 600,
    },
  });
  const vape4 = await prisma.vape.create({
    data: {
      price: 8,
      brand: 'ELUX',
      productType: 'Pod',
      nicotineContent: 20,
      puffsCount: 600,
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
