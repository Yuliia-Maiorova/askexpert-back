import Answer from '../../models/answers.model'
import { Request, Response } from 'express';

async function unapproveAnswer(req: Request, res: Response) {
    try {
        const id = Number(req.params.answer_id)

        // check if answer exists
        let answer = await Answer.findOne({
            where: {id: id},
            attributes: ['id', 'approve_counter']
        })

        // return error if answer not found
        if (!answer) return res.status(404).send({message: 'Answer not found'})

        // update answer approve counter
        answer.approve_counter -= 1;

        // update answer
        let update_answer = await Answer.update(
            { approve_counter: answer.approve_counter },
            { where: { id } }
        );

        // if problem during the update
        if (!update_answer)
            return res.status(404).send({message: 'An error occured while upvoting the answer'});

        // return success message
        return res.status(201).send({ message: 'Answer upvoted successfully' })

    } catch (err) {
        // catch any error ffrom db
        res.status(500).send({message: 'An error occured while upvoting the answer'});
    }
}

export default unapproveAnswer