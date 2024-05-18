import Answer from '../../models/answers.model'
import { Request, Response } from 'express';

async function answerQuestion(req: Request, res: Response) {
    try {
        const post_id = Number(req.params.post_id);
        // get the title and body from the request body
        const { id, content, is_expert, upvote_counter, rating, approve_counter } = req.body;

        if (!is_expert)
            return res.status(403).send({message: 'You are not allowed to post an answer'});

        // check if existant and if not return error
        if (!post_id || !content || !upvote_counter || !rating || !approve_counter) {
            return res.status(400).send({message: 'Please provide all the required fields'});
        }

        // post exist ?

        // create a new post
        let new_answer = await Answer.create({
            owner_id: id,
            post_id,
            content,
            upvote_counter,
            rating,
            approve_counter
        });

        // if post not created return error
        if (!new_answer)
            return res.status(404).send({message: 'An error occured while posting the answer'});

        // send a success message
        res.status(201).send({message: 'Answer posted successfully'});
    } catch (err) {
        // catch any error ffrom db
        res.status(500).send({message: 'An error occured while posting the answer'});
    }
}

export default answerQuestion