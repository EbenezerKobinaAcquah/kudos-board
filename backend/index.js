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


// // GET methods
// app.get('/api/boards', async(req, res) => {
// const boards = await prisma.board.findMany();
// res.json(boards);
// })

// app.get('/api/boards/:id', async (req, res) => {
//     const id  = parseInt(req.params.id);
//     const board = await prisma.board.findUnique({ where: {id} });
//     res.json(board);
//   });

// // POST methods
// app.post('/api/boards', async (req, res) => {
//     const { title, image, category, author } = req.body;
//     const board = await prisma.board.create({ data: { title, image, category, author} });
//     res.json(board);
//   });

//   app.post('/api/boards/:id/cards', async (req, res) => {
//     const id = parseInt(req.params.id);
//     const { title, description, author, gifUrl } = req.body;
//     const newCard = await prisma.card.create({
//         data:
//         {title,
//         description,
//         gifUrl,
//         author,
//         boardId : id,
//         upvotes: 0}});
//     res.json(newCard);
//   });


// app.put('/api/boards/:id', async (req, res) => {
//   const id  = parseInt(req.params.id);
//   const { title, image, category, author } = req.body;
//   const board = await prisma.board.update({ where: {id}, data: {title, image, category, author} });
// })

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// })
