import express, { urlencoded } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import boardRoutes from "./boardRoutes/boardRoutes.js"
import dotenv from 'dotenv';
import cardRoutes from "./cardRoutes/cardRoutes.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(boardRoutes);
app.use(cardRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

