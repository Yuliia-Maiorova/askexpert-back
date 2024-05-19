import { Router } from 'express';
import { VerifToken } from '../../middlewares/jwt/jwt_verify'
import addComment from './addComment';
import getComments from './getComments';

const router = Router();

// route to get all comments of a question

router.get('/:id', VerifToken, getComments);

// route to comment a question

router.put('/:id', VerifToken, addComment);

export default router;