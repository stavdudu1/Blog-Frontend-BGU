import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';
import connectMongo from '../../../lib/mongodb';
import videoSchema from '../../../mongodb/schema'
const cloudinary = require("cloudinary").v2
import jwt from 'jsonwebtoken';
import {getTokenFrom} from "../post/index"

// Configuration 
cloudinary.config({
  cloud_name: "dcu3twzxk",
  api_key: "445843978485733",
  api_secret: "5AiSmIUi1VQ4eX_uu_fHTVvSAJQ"
});


export const config = {
  api: {
    bodyParser: false
  }
};


connectMongo();


// DELETE /api/post/:id
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


  if (req.method === "DELETE") {      
      const postToDelete = await prisma.post.findUnique({
        where: { id: Number(postId) },
      });

      if(postToDelete?.video_url){
        var url= postToDelete.video_url;
        try{
          await videoSchema.deleteMany({postId : postId});
        }
        catch(error){
          console.log("error deleting from mongo");
        }
        const publicId = url?.split('/').pop()?.split('.')[0];
        try{
          await cloudinary.uploader.destroy(publicId, {resource_type: 'video'});
        }
        catch(err){
          console.log("failed to delete from cloudinary");
          console.log(err);
        }
      }

      const post = await prisma.post.delete({
        where: { id: Number(postId) },
      });
      res.json(post);
    // } else {
    //   res.status(401).send({ message: 'Unauthorized' })
    // }
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}