import { Request, Response } from "express";

import Comments from "../../models/comment.model";

export const addComment = async (req: Request, res: Response) => {
    const answer_id = Number(req.params.answer_id);

    if (!req.body.content)
        return res.status(400).json({ error: "Content is required" });

    const { owner_id, content } = req.body;
    try {
        const comment = await Comments.create({
        owner_id,
        answer_id,
        content,
        });
    res.status(201).json({mesage: "Comment sent"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default addComment