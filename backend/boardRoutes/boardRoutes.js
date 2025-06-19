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
        image: "https://picsum.photos/200/300",
      },
    });
    res.status(200).json({ board });
  }
);

export default router;
