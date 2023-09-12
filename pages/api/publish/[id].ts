import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import jwt from 'jsonwebtoken';
import {getTokenFrom} from "../post/index"

// PUT /api/publish/:id
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const postId = req.query.id;
  const token = getTokenFrom(req);
  if (token){
    const decodedToken = jwt.verify(token, process.env.SECRET||"");
    if(!decodedToken){
      return res.status(403).send({ message: 'token invalid'});
    }
  }
  else{
    return res.status(403).send({ message: 'token invalid'});
  }

    const post = await prisma.post.update({
      where: { id: Number(postId) },
      data: { published: true },
    });
    res.json(post);
  
}
