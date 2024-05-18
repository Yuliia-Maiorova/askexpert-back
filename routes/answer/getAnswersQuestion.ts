import Answer from '../../models/answers.model'
import { Request, Response } from 'express';

async function getAnwersQuestion(req: Request, res: Response) {
    try {
        const id = Number(req.params.post_id)

        // check if answer exists for the question
        let answers = await Answer.findAll({
            where: {post_id: id}
        })

        // return empty array if no answers were found
        if (!answers) return res.status(200).json([])

        // sort the answer to get the most upvote answers first
        answers.sort((a, b) => b.upvote_counter - a.upvote_counter)

        // return the answers
        return res.status(200).json(answers)
    } catch (e: any) {
        return res.status(500).json({error: e.message})
    }
}

export default getAnwersQuestion