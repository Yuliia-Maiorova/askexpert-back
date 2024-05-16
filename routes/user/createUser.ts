import { Op } from "sequelize";
import User from "../../models/user.model";
import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import generateToken from "../../middlewares/jwt/generateJWT";

async function createUser(req: Request, res: Response) {

    if ((!req.body.email) || (!req.body.first_name) || (!req.body.password) || (!req.body.last_name))
        return res.status(400).json({error: "Missing field"})

    // get the email and password from the request body
    const { email, first_name, last_name, password, isExpert } = req.body;
    // check if the user already exists
    // @ts-ignore
    const user = await User.findOne({where: {email: email}})

    // if the user exists, return an error
    if (user) {
        return res.status(400).send({error: 'User already exists'});
    }

    // hash the password and create the user in the db
    const hashedPassword = await bcrypt.hash(password, 10);
    const NewUser = await User.create({email, first_name, last_name, password: hashedPassword, isExpert});

    if (!NewUser)
        return res.status(500).send({error: 'Error when creating User'})
    // send a success message

    let token: string = generateToken(isExpert, NewUser.id);

    res.status(201).send({token: token});
}

export default createUser