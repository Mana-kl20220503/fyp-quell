import { createServer } from 'node:http';
import cors from 'cors';
import express from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import authRouter from './routes/auth.js';
import { GetToken, VerifyToken } from './utility/password.js';

const app = express();
const server = createServer(app);

const prisma = new PrismaClient();

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

app.use(express.json());

// BUILD REST API BELOW

// Get Profile
app.get('/getProfile', async (req, res) => {
  const authHeader = req.headers['authorization'];

  const payload = await VerifyToken(authHeader);

  const userId = payload.id;
  const user_id = userId;

  const user_profile = await prisma.user.findUnique({
    where: { id: user_id },
    include: {
      profile: true,
      purchaseLog: {
        include: {
          vape: true,
        },
      },
      post: {
        include: {
          author: { include: { profile: true } },
        },
      },
      puffLog: true,
    },
  });

  if (!user_profile) {
    return res.status(404).send('User not found');
  }

  const vapeIds = new Set(user_profile.purchaseLog.map((log) => log.vapeId));

  const response = {
    ...user_profile,
    uniqueVapeIds: Array.from(vapeIds),
  };

  res.status(200).send(response);
});

app.get('/publicPosts', async (req, res) => {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        include: {
          profile: true,
        },
      },
    },
  });

  res.json(posts);
});

// Add Puff Log
app.post('/addPuffLog', async (req, res) => {
  const authHeader = req.headers['authorization'];

  const payload = await VerifyToken(authHeader);

  const userId = payload.id;

  console.log('userId', userId);
  console.log('req.body.vapeId', req.body.vapeId);
  const vape_id = req.body.vapeId;

  const vape = await prisma.vape.findUnique({
    where: { id: vape_id },
  });

  const user_id = userId;
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

  res.send('Add Puff Log');
});

// Get puff logs
app.get('/getPuffLogs', async (req, res) => {
  const authHeader = req.headers['authorization'];
  const payload = await VerifyToken(authHeader);
  const userId = payload.id;

  console.log('userId', userId);

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  let whereClause = {
    userId: userId,
  };

  const startDate = req.query.startDate;
  const endDate = req.query.endDate;

  console.log(startDate);
  console.log(endDate);

  if (startDate || endDate) {
    whereClause.createdAt = {};
    if (startDate) {
      whereClause.createdAt.gte = new Date(startDate);
    }
    if (endDate) {
      whereClause.createdAt.lte = new Date(endDate);
    }
  }

  const puffLogs = await prisma.puffLog.findMany({
    where: whereClause,
    include: {
      vape: true,
    },
  });

  res.json(puffLogs);
});

app.get('/getTodayLogs', async (req, res) => {
  const authHeader = req.headers['authorization'];
  const payload = await VerifyToken(authHeader);
  const userId = payload.id;

  console.log('userId', userId);

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  let whereClause = {
    userId: userId,
  };

  const startDate = req.query.startDate;
  const endDate = req.query.endDate;

  console.log(startDate);
  console.log(endDate);

  if (startDate || endDate) {
    whereClause.createdAt = {};
    if (startDate) {
      whereClause.createdAt.gte = new Date(startDate);
    }
    if (endDate) {
      whereClause.createdAt.lte = new Date(endDate);
    }
  }

  const puffLogs = await prisma.puffLog.findMany({
    where: whereClause,
    include: {
      vape: true,
    },
  });

  res.json(puffLogs);
});

// Get Vape log
app.get('/getVapes', async (req, res) => {
  const vapes = await prisma.vape.findMany({});

  res.json(vapes);
});

// Add Diary
app.post('/addDiary', async (req, res) => {
  const authHeader = req.headers['authorization'];

  const payload = await VerifyToken(authHeader);

  const userId = payload.id;

  console.log('userId', userId);
  console.log('req.body.content', req.body.content);
  console.log('req.body.mood', req.body.mood);

  const user_id = userId;
  const user = await prisma.user.findUnique({
    where: { id: user_id },
  });

  const diary = await prisma.post.create({
    data: {
      createdAt: new Date(),
      updatedAt: new Date(),
      authorId: user.id,
      isPublic: false,
      content: req.body.content,
      mood: req.body.mood,
    },
  });

  res.send('Add Diary');
});

app.get('/getDiaries', async (req, res) => {
  const authHeader = req.headers['authorization'];
  const payload = await VerifyToken(authHeader);
  const userId = payload.id;

  console.log('userId', userId);

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  let whereClause = {
    authorId: userId,
    isPublic: false,
  };

  const diaries = await prisma.post.findMany({
    where: whereClause,
  });

  res.json(diaries);
});

// Add Post
app.post('/addPost', async (req, res) => {
  const authHeader = req.headers['authorization'];

  const payload = await VerifyToken(authHeader);

  const userId = payload.id;

  console.log('userId', userId);
  console.log('req.body.content', req.body.content);

  const user_id = userId;
  const user = await prisma.user.findUnique({
    where: { id: user_id },
  });

  const diary = await prisma.post.create({
    data: {
      createdAt: new Date(),
      updatedAt: new Date(),
      authorId: user.id,
      isPublic: true,
      content: req.body.content,
    },
  });

  res.send('Add Post');
});

// Like Post
app.post('/likePost', async (req, res) => {
  const { postId } = req.body;

  if (!postId) {
    return res.status(400).send('Post ID is required');
  }

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return res.status(404).send('Post not found');
    }

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: { likes: post.likes + 1 },
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error('Error liking the post:', error);
    res.status(500).send('Error updating the post');
  }
});

// Add Vape Log
app.post('/addPurchaseLog', async (req, res) => {
  const authHeader = req.headers['authorization'];

  const payload = await VerifyToken(authHeader);

  const userId = payload.id;

  console.log('userId', userId);
  console.log('req.body.vapeId', req.body.vapeId);
  console.log('req.body.quantity', req.body.quantity);

  const quantity = req.body.quantity;

  const vape_id = req.body.vapeId;

  const vape = await prisma.vape.findUnique({
    where: { id: vape_id },
  });

  const user_id = userId;
  const user = await prisma.user.findUnique({
    where: { id: user_id },
  });

  const purchase = await prisma.purchaseLog.create({
    data: {
      createdAt: new Date(),
      updatedAt: new Date(),
      totalCost: vape.price * quantity,
      quantity: quantity,
      userId: user.id,
      vapeId: vape.id,
    },
  });

  res.send('Add Purchase Log');
});

app.use(authRouter);
server.listen(3000, () =>
  console.log(`
Server ready at: http://localhost:3000`)
);
