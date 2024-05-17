import Answer from '../../models/answers.model'
import { Request, Response } from 'express';

async function upvoteAnswer(req: Request, res: Response) {
    try {
        const id = Number(req.params.answer_id)
        // get the title and body from the request body
        const { upvote_counter } = req.body;

        // check if existant and if not return error
        if (!upvote_counter) {
            return res.status(400).send({message: 'Please provide all the required fields'});
        }

        // update answer upvote counter
        let update_answer = await Answer.update(
            { upvote_counter },
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