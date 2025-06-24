import express, { Router, json } from "express";
import { PrismaClient } from "@prisma/client";
import validation from "../validation/validation.js";

express().use(json());
const prisma = new PrismaClient();
const router = Router();

// create a new board
router.post(
  "/api/board/create",
  validation.validateCreateBoard,
  async (req, res) => {
    const {
      body: { title, category, author },
    } = req;
    const board = await prisma.board.create({
      data: {
        title: title,
        category: category,
        author: author ? author : "Anonymous",
        // Using title as seed
        image: `https://picsum.photos/200/300?random=${title.replace(
          /\s+/g,
          ""
        )}`,
      },
    });
    res.status(200).json({ board });
  }
);

// delete a board
router.delete("/api/board/delete/:id", async (req, res) => {
  const { id } = req.params;
  const boardId = parseInt(id);
  if (isNaN(boardId)) {
    return res.status(400).json({ error: "Invalid board ID" });
  }
  try {
    // First delete all cards associated with the board
    await prisma.card.deleteMany({
      where: {
        boardId: boardId,
      },
    });
    // Then delete the board
    const deleteBoard = await prisma.board.delete({
      where: {
        id: boardId,
      },
    });
    res
      .status(200)
      .json({ message: "Board deleted successfully", deleteBoard });
  } catch (error) {
    alert(error);
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Board not found" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
});

//view all cards in a board
router.get("/api/board/view/:id", async (req, res) => {
  const { id } = req.params;
  const boardId = parseInt(id);

  if (isNaN(boardId)) {
    return res.status(400).json({ error: "Invalid board ID" });
  }

  try {
    const board = await prisma.board.findFirst({
      where: {
        id: boardId,
      },
      include: {
        card: true,
      },
    });

    if (!board) {
      return res.status(404).json({ error: "Board not found" });
    }
    res.json(board.card);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//view all boards
router.get("/api/board/all", async (req, res) => {
  const boards = await prisma.board.findMany({
    include: {
      card: true,
    },
  });
  res.json(boards);
});

export default router;
