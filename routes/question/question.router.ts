import { Router } from 'express';
import { VerifToken } from '../../middlewares/jwt/jwt_verify';
import postQuestion from './postQuestion';
import getUnansweredQuestions from './getUnansweredQuestions';
import getQuestions from './getQuestions';
const router = Router();

// get all questions

router.get('/', VerifToken, getQuestions);

// create a Post
router.put('/', VerifToken, postQuestion);

// get unanswered questions

router.get('/unanswered', VerifToken, getUnansweredQuestions);

export default router;