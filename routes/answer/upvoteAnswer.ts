import Answer from '../../models/answers.model'
import { Request, Response } from 'express';

async function upvoteAnswer(req: Request, res: Response) {
    try {
        const id = Number(req.params.answer_id)
        // get the title and body from the request body

        // check if answer exists
        let answer = await Answer.findOne({
            where: {id: id},
            attributes: ['id', 'upvote_counter']
        })

        // return error if answer not found
        if (!answer) return res.status(404).send({message: 'Answer not found'})

        // answer exist ?

        // update answer upvote counter
        answer.upvote_counter += 1;

        // update answer
        let update_answer = await Answer.update(
            { upvote_counter: answer.upvote_counter },
            { where: { id } }
        );

        // if post not created return error
        if (!update_answer)
            return res.status(404).send({message: 'An error occured while upvoting the answer'});

        // send a success message
        res.status(201).send({message: 'Answer upvoted successfully'});
    } catch (err) {
        // catch any error ffrom db
        res.status(500).send({message: 'An error occured while upvoting the answer'});
    }
}

export default upvoteAnswer