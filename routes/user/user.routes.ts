import { Router } from 'express';
import { VerifToken } from '../../middlewares/jwt/jwt_verify';

import createUser from './createUser';
import loginUser from './loginUser';
import answerQuestion from './answerQuestion';
import upvoteAnswer from './upvoteAnswer';

let router = Router();

// route to create User
router.post('/create', createUser);

router.post('/login', loginUser);

// route to answer a question
router.post('/answerQuestion/:post_id', VerifToken, answerQuestion);

// route to upvote an answer
router.post('/upvoteAnswer/:answer_id', VerifToken, upvoteAnswer);

export default router;