import Answer from '../../models/answers.model'
import { Request, Response } from 'express';
import ReactionUserAnswer from '../../models/reactionUserAnswer.model';

async function upvoteAnswer(req: Request, res: Response) {
    try {
        const id = Number(req.params.answer_id)

        // check if answer exists
        let answer = await Answer.findOne({
            where: {id: id},
            attributes: ['id', 'upvote_counter']
        })

        if (!answer) return res.status(400).json({error: "answer don't exist"})

        // check if the user_already upvote
        const user_upvote = await ReactionUserAnswer.findOne({
            where: {user_id: req.body.id, answer_id: id}
        })

        if (user_upvote) {
            if (user_upvote.upvote === true)
                return res.status(400).json({message: "You already upvoted this !"})
            else
                await ReactionUserAnswer.update({upvote: true}, {where: {user_id: req.body.id, answer_id: id}})
        } else {
            await ReactionUserAnswer.create({user_id: req.body.id, answer_id: id, upvote: true})
        }
    
        let upvotes = await ReactionUserAnswer.findAll({
            where: {answer_id: id, upvote: true}
        })

        // update the upvote_counter
        await Answer.update({upvote_counter: upvotes.length}, {where: {id: id}})

        res.status(201).send({message: 'Answer upvoted successfully'});
    } catch (err) {
        // catch any error ffrom db
        res.status(500).send({message: 'An error occured while upvoting the answer'});
    }
}

export default upvoteAnswer