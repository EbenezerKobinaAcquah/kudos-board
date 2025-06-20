import express, {Router, json} from "express";
import { PrismaClient } from "@prisma/client";
import validation from "../validation/validation.js";

express().use(json());
const prisma = new PrismaClient();
const router = Router();

// create a card
router.post("/api/board/card/create", async(req, res) => {
    const {title, description, gifUrl, boardId} = req.body
    const card = await prisma.card.create({
        data : {
            title : title,
            description : description,
            gifUrl : gifUrl,
            board : {
                connect : {
                    id : boardId
                }
            }

        }

    })
    res.json(card)
})

// upvote a card
router.patch("/api/board/card/upvote", async (req, res) => {
    const {id} = req.body
    console.log(id)
    const card = await prisma.card.findFirst({
        where : {
            id : id
        }
    })

    const updatedUpvotes = card.upvotes + 1

    const updatedCard = await prisma.card.update({
        where : {
            id : id
        },
        data : {
            upvotes : updatedUpvotes
        }
    })
    res.json(updatedCard)

})

//delete a card

router.delete("/api/board/card/delete", async (req, res) => {
    const {body : {id}} = req
    const card = await prisma.card.delete({
        where : {
            id : id
        }
    })
    res.json(card)
})

export default router;
