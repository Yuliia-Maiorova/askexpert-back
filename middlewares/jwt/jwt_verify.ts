import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import secret_key from './secret_key';
import User from '../../models/user.model';

const VerifToken = (req: Request, res: Response, next: NextFunction) => {

    // get the token from the Authorization header sent by the web
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(403).json({ message: "Access Denied" });

    try {
        // transform the token in a readable and easier object to evaluate
        const decodedToken: { id: number, is_expert: boolean } | any = jwt.verify(token, secret_key.getSecretKey());

        // check if the user of the token still exist
        let user = User.findOne({
            where: { id : decodedToken.id }
        })

        // error if user don't exit
        if (!user) return res.status(403).json({message: "Invalid Token User"});

        // if the token is valid, add the id and is_expert to the body of the request
        if (!req.body.id)
            req.body.id = decodedToken.id;

        if (!req.body.is_expert)
            req.body.is_expert = decodedToken.is_expert;

        // call the route function
        next();
    } catch (err) {
        res.status(403).json({ message: "Invalid Token" });
    }
}

export { VerifToken };