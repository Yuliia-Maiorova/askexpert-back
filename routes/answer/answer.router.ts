import { Router } from 'express';
import { VerifToken } from '../../middlewares/jwt/jwt_verify'

import upvoteAnswer from './upvoteAnswer';
import rateAnswer from './rateAnswer';
import answerQuestion from './answerQuestion';

const router = Router();

// answer a question

router.put('/post_id', VerifToken, answerQuestion);

// route to rate an answer

router.post('/rate', VerifToken, rateAnswer);

// route to upvote an answer
router.post('/upvote/:answer_id', VerifToken, upvoteAnswer);

export default Router;