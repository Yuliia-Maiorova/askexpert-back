import { Request, Response } from 'express'
import Categories from '../../models/categories.model';

async function getAllCategories(req: Request, res: Response) {
    try {
        let categories = await Categories.findAll({
            attributes: ['id', 'name', 'hex_code']
        })

        return res.status(200).json(categories);
    } catch (e: any) {
        return res.status(500).json({error: e.message})
    }
}

export default getAllCategories;