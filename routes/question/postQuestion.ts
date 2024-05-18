import Post from '../../models/posts.model';
import { Request, Response } from 'express';

async function postQuestion(req: Request, res: Response) {
    try {
        // get the title and body from the request body
        const { title, content, category_id, id } = req.body;

        // check if existant and if not return error
        if (!title || !content || !category_id) {
            return res.status(400).send({message: 'Please provide all the required fields'});
        }

        // verify if the category exists ...

        // create a new post
        let new_post = await Post.create({
            title,
            content,
            owner_id: id,
            category_id
        });

        // if post not created return error
        if (!new_post)
            return res.status(404).send({message: 'An error occured while posting the question'});

        // send a success message
        res.status(201).send({message: 'Question posted successfully'});
    } catch (err) {
        // catch any error ffrom db
        res.status(500).send({message: 'An error occured while posting the question'});
    }
}

export default postQuestion