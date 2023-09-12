import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import Video from '../../../mongodb/schema';
import connectMongo from '../../../lib/mongodb';
import jwt from 'jsonwebtoken';
import { csrf } from "../../../lib/csrf";



// connect to mongodb
connectMongo()

// get token
export function getTokenFrom(req:NextApiRequest):(string|null) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token !== undefined)
    return token;
  
  return null;
}


// POST /api/post
// Required fields in body: title
// Optional fields in body: content
async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { title, content, email, video_url} = req.body;
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

    const result = await prisma.post.create({
      data: {
        title: title,
        content: content,
        author: { connect: { email: email } },
        video_url: video_url,
      },
    });
    res.json(result); 

    if (video_url){
      await Video.create({
        userEmail: email,
        dateUploaded: new Date().toJSON().slice(0, 10),
        postId: result.id,
        videoLink: video_url,
      }) 
    }

}

export default csrf(handle);