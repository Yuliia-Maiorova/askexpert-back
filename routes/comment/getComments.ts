import { Request, Response } from "express";

import Comments from "../../models/comment.model";

export const getComments = async (req: Request, res: Response) => {
    const answer_id = Number(req.params.answer_id);

    try {
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