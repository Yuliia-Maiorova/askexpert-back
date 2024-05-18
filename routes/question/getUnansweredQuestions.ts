import Answers from '../../models/answers.model';
import Post from '../../models/posts.model';
import { Request, Response } from 'express';

async function getUnansweredQuestions(req: Request, res: Response) {
    try {
        const {is_expert} = req.body;

        // check if the user is an expert
        if (!is_expert)
            return res.status(403).send({message: 'You are not allowed to do that'})

        // get all posts and answers
        let answers = await Answers.findAll();
        let posts = await Post.findAll({
            attributes: ['id', 'title', 'content', 'owner_id', 'category_id']
        })

        // check if there is answers
        if (!answers) return res.status(200).json(posts);

        // filter the Posts that haven't answers yet
        let answered_questions = answers.map((answer) => answer.post_id);
        let unanswered_questions = posts.filter((post) => !answered_questions.includes(post.id));

        // return theses questions
        return res.status(200).json(unanswered_questions);

    } catch (e: any ) {
        return res.status(500).json({error: e.message})
    }
}

export default getUnansweredQuestions