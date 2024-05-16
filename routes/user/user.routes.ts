import { Router } from 'express';

import createUser from './createUser';
import loginUser from './loginUser';

let router = Router();

// route to create User
router.post('/create', createUser);

router.post('/login', loginUser);

export default router;