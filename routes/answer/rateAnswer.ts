import Answer from "../../models/answers.model";
import { Request, Response } from "express";

async function rateAnswer(req: Request, res: Response) {
  try {
    // get the title and body from the request body
    const { id, rating } = req.body;

    // check if existant and if not return error
    if (!rating) {
      return res.status(400).send({ message: "Please provide all the required fields" });
    }

    // update post rating
    let new_answer = await Answer.update(
      { rating },
      { where: { id } }
    );

    // if post not created return error
    if (!new_answer) return res.status(404).send({ message: "An error occured while rating the answer" });

    // send a success message
    res.status(201).send({ message: "Answer rated successfully" });
  } catch (err) {
    // catch any error from db
    res.status(500).send({ message: "An error occured while rating the answer" });
  }
}

export default rateAnswer;