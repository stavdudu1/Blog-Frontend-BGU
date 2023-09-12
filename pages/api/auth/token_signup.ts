import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';
import bcrypt from 'bcrypt'


// POST /api/auth/token_signup
// Required fields in body: userName, password
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
const {name, email, userName, password} = req.body;

const emailCheck = await prisma.user.findUnique({where:{email: email}});
if (emailCheck){
    return res.status(403).send({message: "email already in use"});
}
const passwordHash = await bcrypt.hash(password, 10);
try{
    await prisma.user.create({data: {name: name, email: email, userName: userName, passwordHash: passwordHash }});
    res.status(201).send({message: "success in signing up user"});
}
catch(err){
    res.status(500).send(err);
}

}
