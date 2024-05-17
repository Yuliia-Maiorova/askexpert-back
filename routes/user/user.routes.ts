import { Router } from 'express';

import createUser from './createUser';
import loginUser from './loginUser';
import postQuestion from './postQuestion';
import answerQuestion from './answerQuestion';
import upvoteAnswer from './upvoteAnswer';

let router = Router();

// route to create User
router.post('/create', createUser);

router.post('/login', loginUser);

// route to post a question
router.post('/postQuestion', postQuestion);

// route to answer a question
router.post('/answerQuestion', answerQuestion);

// route to upvote an answer
router.post('/upvoteAnswer', answerQuestion);

export default router;