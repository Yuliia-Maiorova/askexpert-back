import Post from '../../models/posts.model';
import { Request, Response } from 'express';
import ReactionUserAnswer from '../../models/reactionUserAnswer.model';

async function getQuestions(req: Request, res: Response) {
    try {
        // get all posts
        let posts = await Post.findAll({
            attributes: ['id', 'title', 'content', 'owner_id', 'category_id']
        })

        let reactions = await ReactionUserAnswer.findAll({
            where: {user_id: req.body.id},
            attributes: ['answer_id', 'upvote', 'approve']
        })

        // return all posts
        return res.status(200).json({posts: posts, reactions: reactions})
    } catch (e: any) {
        return res.status(500).json({error: e.message})
    }
}

export default getQuestions;