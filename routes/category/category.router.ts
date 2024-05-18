import { Router } from 'express';
import createCategory from './createCategory';
import getAllCategories from './getAllCategories';

const router = Router();

// get all categories

router.get('/', getAllCategories);

// create a category

router.put('/debug', createCategory);

export default router;