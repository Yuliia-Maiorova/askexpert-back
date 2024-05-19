import { Request, Response } from 'express'
import Categories from '../../models/categories.model';

async function createCategory(req: Request, res: Response) {
    try {
        if ((!req.body.hex_code) || (!req.body.name)) return res.status(400).json({error: 'Missing fields'})

        const {hex_code, name} = req.body;

        // create a new category

        const category = await Categories.create(
            {hex_code, name}
        )

        return res.status(201).json(category)
    } catch (e: any) {
        return res.status(500).json({error: e.message})
    }
}

export default createCategory;