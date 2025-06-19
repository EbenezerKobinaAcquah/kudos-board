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

// delete a board
router.delete("/api/board/delete", validation.validateBoardCardId, async(req, res) => {
    const {body : {id}} = req;
    await prisma.card.deleteMany({
        where: {
            boardId: id
        }
    })

    const deleteBoard = await prisma.board.delete({
        where: {
            id: id
        }
    })
    res.status(200).json({deleteBoard})
})

//view all cards in a bard
router.get("api/board/view", validation.validateBoardCardId, async(req, res) => {
    const {body : {id}} = req;
    const board = await prisma.board.findFirst({
        where : {
            id : id
        },
        include : {
            card : true
        }
    })
    res.json(board.card)
})


router.get("/api/board/all", async (req, res) => {
    const boards = await prisma.board.findMany(
        {
            include: {
                card: true
            }
        }
    )
    res.json(boards)
})


export default router;
