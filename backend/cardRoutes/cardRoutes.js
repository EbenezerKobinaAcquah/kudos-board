import express, { Router, json } from "express";
import { PrismaClient } from "@prisma/client";

express().use(json());
const prisma = new PrismaClient();
const router = Router();

// create a card
router.post("/api/board/card/create", async (req, res) => {
  const { title, description, gifUrl, boardId } = req.body;
  const card = await prisma.card.create({
    data: {
      title: title,
      description: description,
      gifUrl: gifUrl,
      board: {
        connect: {
          id: boardId,
        },
      },
    },
  });
  res.json(card);
});

// upvote a card
router.patch("/api/board/card/upvote", async (req, res) => {
  const { id } = req.body;
  console.log(id);
  const card = await prisma.card.findFirst({
    where: {
      id: id,
    },
  });

  const updatedUpvotes = card.upvotes + 1;

  const updatedCard = await prisma.card.update({
    where: {
      id: id,
    },
    data: {
      upvotes: updatedUpvotes,
    },
  });
  res.json(updatedCard);
});

//delete a card

router.delete("/api/board/card/delete", async (req, res) => {
  const {
    body: { id },
  } = req;
  const card = await prisma.card.delete({
    where: {
      id: id,
    },
  });
  res.json(card);
});

// create a comment for a card
router.post("/api/board/card/comment/create", async (req, res) => {
  try {
    const { message, author, cardId } = req.body;

    const comment = await prisma.comment.create({
      data: {
        message: message,
        author: author,
        card: {
          connect: {
            id: cardId,
          },
        },
      },
    });
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get comments for a card
router.get("/api/board/card/comments/:cardId", async (req, res) => {
  try {
    const cardId = parseInt(req.params.cardId);
    console.log("Fetching comments for cardId:", cardId);

    const comments = await prisma.comment.findMany({
      where: {
        cardId: cardId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
