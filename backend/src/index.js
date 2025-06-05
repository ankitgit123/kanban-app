const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

dotenv.config();

const app = express();
const prisma = new PrismaClient();
app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json('ok');
});

app.post('/api/tasks', async (req, res) => {
  const { title, status } = req.body;
  try {
    const task = await prisma.task.create({ data: { title, status } });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
  
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});