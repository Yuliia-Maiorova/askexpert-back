import { Router } from 'express';
import { VerifToken } from '../../middlewares/jwt/jwt_verify';
import postQuestion from './postQuestion';
import answerQuestion from './answerQuestion';

const router = Router();

// create a Post
router.put('/', VerifToken, postQuestion);


// route to answer a question
router.post('/answer/:post_id', VerifToken, answerQuestion);

export default router;