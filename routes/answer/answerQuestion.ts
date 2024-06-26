import Answer from '../../models/answers.model'
import Post from '../../models/posts.model'
import { Request, Response } from 'express';

async function answerQuestion(req: Request, res: Response) {
    try {
        const post_id = Number(req.params.post_id);
        // get the title and body from the request body
        const { id, content, is_expert} = req.body;

        // check if user is expert
        if (!is_expert)
            return res.status(403).send({message: 'You are not allowed to post an answer'});

        // check if existant and if not return error
        if (!content) {
            return res.status(400).send({message: 'Please provide all the required fields'});
        }

        // check if the expert doesn't have already answer to that question
        let already_answered = await Answer.findOne({
            where: { owner_id: id, post_id }
        });

        // don't allow him to re-answer if has already answered before
        if (already_answered)
            return res.status(400).send({message: 'You have already answered this question'});

        // check if post with provided post id exists
        let post = await Post.findOne({
            where: { id: post_id }
        });

        // if post not found return error
        if (!post) {
            return res.status(404).send({message: 'Post with this id not found'});
        }

        // create a new post
        let new_answer = await Answer.create({
            owner_id: id,
            post_id,
            content
        });

        // if post not created return error
        if (!new_answer)
            return res.status(404).send({message: 'An error occured while posting the answer'});

        // send a success message
        res.status(201).send({message: 'Answer posted successfully'});
    } catch (err: any) {
        console.log(err)
        // catch any error ffrom db
        res.status(500).send({message: err.message});
    }
}

export default answerQuestion