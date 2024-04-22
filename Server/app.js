import { createServer } from 'node:http';
import cors from 'cors';
import express from 'express';
import { Prisma, PrismaClient } from '@prisma/client';

const app = express();
const server = createServer(app);

const prisma = new PrismaClient();

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

// BUILD REST API BELOW

// API/Endpoint 1
app.post('/addPuffLog', async (req, res) => {
  const vape_id = 1; // In vue this needs to be dynamic req.body.vape.id

  const vape = await prisma.vape.findUnique({
    where: { id: vape_id },
  });

  const user_id = 1; // In vue this needs to be dynamic req.body.user.id
  const user = await prisma.user.findUnique({
    where: { id: user_id },
  });

  const puff = await prisma.puffLog.create({
    data: {
      createdAt: new Date(),
      updatedAt: new Date(),
      nicotineIntake: vape.nicotineContent / vape.puffsCount,
      userId: user.id,
      vapeId: vape.id,
    },
  });

  res.send('OK');
});

app.get('/getPuffLogs', async (req, res) => {
  const vape_id = 1;
  const vape = await prisma.vape.findUnique({
    where: { id: vape_id },
  });

  const user_id = 1;
  const user = await prisma.user.findUnique({
    where: { id: user_id },
  });

  const puffLogs = await prisma.puffLog.findMany({
    where: { userId: user.id, vapeId: vape.id },
  });

  res.json(puffLogs);
});

// API/Endpoint 2
app.get('/printHi', async (req, res) => {
  console.log('Hi');
  res.send('OK');
});

server.listen(3000, () =>
  console.log(`
Server ready at: http://localhost:3000`)
);
