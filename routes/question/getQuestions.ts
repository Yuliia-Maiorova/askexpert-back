import Post from '../../models/posts.model';
import { Request, Response } from 'express';

async function getQuestions(req: Request, res: Response) {
    try {
        // get all posts
        let posts = await Post.findAll({
            attributes: ['id', 'title', 'content', 'owner_id', 'category_id']
        })

        // return all posts
        return res.status(200).json(posts);
    } catch (e: any) {
        return res.status(500).json({error: e.message})
    }
}

export default getQuestions;