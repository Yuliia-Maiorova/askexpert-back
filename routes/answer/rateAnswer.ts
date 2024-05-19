import Answer from "../../models/answers.model";
import { Request, Response } from "express";
import RateUserAnswer from "../../models/rateUserAnswer.model";

async function rateAnswer(req: Request, res: Response) {
  try {

    const answer_id = Number(req.params.answer_id)

    // get the title and body from the request body
    const { id, rating } = req.body;

    // check if existant and if not return error
    if (!rating) {
      return res.status(400).send({ message: "Please provide all the required fields" });
    }

    // find the answer in the DB
    const answer = await Answer.findOne({
      where: { id: answer_id }
    });

    // if answer doesn't exist, send back an error
    if (!answer) return res.status(400).json({error: "Answer doesn't exist"})

      // check user rate
      let user_rate = await RateUserAnswer.findOne({
        where: { user_id: id, answer_id }
      });

    if (!user_rate) {
      // create a new post
      await RateUserAnswer.create({
        user_id: id,
        answer_id,
        rate: rating
      });
    } else {
      user_rate.rate = rating;
      await user_rate.save();
    }

    const rates = await RateUserAnswer.findAll({
      where: { answer_id }
    });

    // compute the average
    let total_rate = rates.length
    let sum = 0;

    rates.forEach(rate => {
      sum += rate.rate;
    });
    let average = sum / total_rate;

    // update the answer rate
    await Answer.update({
      rating: average
    }, {
      where: { id: answer_id }
    })

    // send a success message
    res.status(201).send({ message: "Answer rated successfully", "rate": average});
  } catch (err) {
    // catch any error from db
    res.status(500).send({ message: "An error occured while rating the answer" });
  }
}

export default rateAnswer;