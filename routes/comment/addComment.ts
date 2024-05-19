import { Request, Response } from "express";

import Comments from "../../models/comment.model";
import Answers from "../../models/answers.model";

export const addComment = async (req: Request, res: Response) => {
    const answer_id = Number(req.params.id);

    console.log(answer_id)

    // check if the comment is in the body
    if (!req.body.content)
        return res.status(400).json({ error: "Content is required" });

    const { content } = req.body;
    try {
        // check if answer still exist

        const answer = await Answers.findOne({
            where: req.body.id
        })

        // send an error if not
        if (!answer) return res.status(400).json({error: "Answer doesn't exist"})
        // store comment inside the DB
        await Comments.create({
        owner_id: req.body.id,
        answer_id,
        content,
        });
    res.status(201).json({mesage: "Comment sent"});
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};

export default addComment