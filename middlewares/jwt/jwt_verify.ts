import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import secret_key from './secret_key';
import User from '../../models/user.model';

const VerifToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(403).json({ message: "Access Denied" });

    try {
        const decodedToken: { id: number, is_expert: boolean } | any = jwt.verify(token, secret_key.getSecretKey());

        let user = User.findOne({
            where: { id : decodedToken.id }
        })

        if (!user) return res.status(403).json({message: "Invalid Token User"});

        if (!req.body.id)
            req.body.id = decodedToken.id;

        if (!req.body.is_expert)
            req.body.is_expert = decodedToken.is_expert;

        next();
    } catch (err) {
        res.status(403).json({ message: "Invalid Token" });
    }
}

export { VerifToken };