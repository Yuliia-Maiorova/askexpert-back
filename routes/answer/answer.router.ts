import { Router } from 'express';
import { VerifToken } from '../../middlewares/jwt/jwt_verify'

import upvoteAnswer from './upvoteAnswer';
import rateAnswer from './rateAnswer';
import answerQuestion from './answerQuestion';
import getAnwersQuestion from './getAnswersQuestion';
import approveAnswer from './approveAnswer';
import unapproveAnswer from './unapproveAnswer';

const router = Router();

// route to get all answers of a question

router.get('/:post_id', VerifToken, getAnwersQuestion);

// answer a question

router.put('/post_id', VerifToken, answerQuestion);

// route to rate an answer

router.post('/rate', VerifToken, rateAnswer);

// route to upvote an answer

router.post('/upvote/:answer_id', VerifToken, upvoteAnswer);

// approve un answer

router.post('/approve/answer_id', VerifToken, approveAnswer);

// unapprove un answer

router.post('/unapprove/answer_id', VerifToken, unapproveAnswer);

export default Router;