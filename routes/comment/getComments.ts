import { Request, Response } from "express";

import Comments from "../../models/comment.model";
import Answers from "../../models/answers.model";

export const getComments = async (req: Request, res: Response) => {
    const answer_id = Number(req.params.answer_id);

    try {

        // check if answer exists in the DB
        const answer = await Answers.findOne({
            where: {id: req.body.id}
        })

        if (!answer) return res.status(400).json({error: "Answer doesn't exist"})
        // get all comments in the DB
        const comments = await Comments.findAll({
        where: {
            answer_id,
        },
        });
        res.status(200).json({ comments });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export default getComments