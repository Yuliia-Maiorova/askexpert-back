import bcrypt from 'bcrypt';
import User from '../../models/user.model';
import generateToken from '../../middlewares/jwt/generateJWT';
import { Request, Response } from 'express';

async function loginUser(req: Request, res: Response) {
    try {
        // get the email, username and password from the request body
        const { email, password } = req.body;

        // check if the user already exists
        const user = await User.findOne({where: {email: email}})

        // if the user exists, return an error
        if (!user) return res.status(400).send({error: "User don't exists"});

        // check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(400).send({error : 'Password is incorrect'});

        let token: string = generateToken(user.isExpert, user.id);

        // send a success message
        res.status(201).send({token: token});
    } catch (e:any) {
        return res.status(500).json({error: e.message})
    }
}

export default loginUser