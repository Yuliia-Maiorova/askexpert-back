import { Router } from 'express';

import createUser from './createUser';
import loginUser from './loginUser';
import postQuestion from './postQuestion';
import answerQuestion from './answerQuestion';

let router = Router();

// route to create User
router.post('/create', createUser);

router.post('/login', loginUser);

// route to post a question
router.post('/postQuestion', postQuestion);

// route to answer a question
router.post('/answerQuestion', answerQuestion);

export default router;