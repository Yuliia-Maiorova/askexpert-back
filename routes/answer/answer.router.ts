import { Router } from 'express';
import { VerifToken } from '../../middlewares/jwt/jwt_verify'

import upvoteAnswer from './upvoteAnswer';
import rateAnswer from './rateAnswer';

const router = Router();

// route to rate an answer

router.post('/rate', VerifToken, rateAnswer);

// route to upvote an answer
router.post('/upvote/:answer_id', VerifToken, upvoteAnswer);

export default Router;