import { Router } from 'express';
import { VerifToken } from '../../middlewares/jwt/jwt_verify';

import createUser from './createUser';
import loginUser from './loginUser';

let router = Router();

// route to create User
router.post('/register', createUser);

router.post('/login', loginUser);

export default router;