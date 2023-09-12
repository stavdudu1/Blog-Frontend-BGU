import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

// POST /api/auth/token_signin
// Required fields in body: userName, password
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
const {userName, password} = req.body;
const user = await prisma.user.findFirst({where: {
    userName: userName
},
})

const passwordCorrect = user === null ? false
: await bcrypt.compare(password, user.passwordHash);

if (!(user && passwordCorrect)){
     res.status(404).send({error: 'invalid user name or password'});
}

else{
const userForToken = {
    userName: user.userName,
    name: user.name,
    email: user.email,
    id: user.id
}

const token = jwt.sign(userForToken, process.env.SECRET||"");
const userToken = {
    token,
    email: user.email,
    name: user.name,
    id: user.id,
    userName: user.userName
}

res.setHeader("Set-Cookie",
`loggedUser=${encodeURIComponent(
    JSON.stringify(userToken)
)}; Max-Age=7200; Path=/;`);
res.status(200).send(userToken);

}

}