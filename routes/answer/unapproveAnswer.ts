import Answer from '../../models/answers.model'
import { Request, Response } from 'express';
import ReactionUserAnswer from '../../models/reactionUserAnswer.model';

async function unapproveAnswer(req: Request, res: Response) {
    try {
        const id = Number(req.params.answer_id)

        // check if answer exists
        let answer = await Answer.findOne({
            where: {id: id},
            attributes: ['id', 'upvote_counter']
        })

        if (!answer) return res.status(400).json({error: "answer don't exist"})

        // check if the user_already upvote
        const user_approve = await ReactionUserAnswer.findOne({
            where: {user_id: req.body.id, answer_id: id}
        })

        // if the user is stored in the DB 
        if (user_approve) {
            // if he already disapproves, send back an error
            if (user_approve.approve === false)
                return res.status(400).json({message: "You already disapproved this !"})
            else
                // otherwise change his opinion in the DB
                await ReactionUserAnswer.update({approve: false}, {where: {user_id: req.body.id, answer_id: id}})
        } else {
            // if his opinion not sotred in the DB, store his disapproval in the DB
            await ReactionUserAnswer.create({user_id: req.body.id, answer_id: id, approve: false})
        }

        // get all approval
        let approves = await ReactionUserAnswer.findAll({
            where: {answer_id: id, approve: true}
        })

        // update the upvote_counter
        await Answer.update({approve_counter: approves.length}, {where: {id: id}})

        return res.status(201).json({message: "Answer is now disapproved", approval_counter: approves.length})

    } catch (err) {
        // catch any error ffrom db
        res.status(500).send({message: 'An error occured while upvoting the answer'});
    }
}

export default unapproveAnswer