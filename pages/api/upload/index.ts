import type { NextApiRequest, NextApiResponse } from 'next'
import { IncomingForm } from "formidable";
const cloudinary = require("cloudinary").v2;



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

// POST /api/upload
// Required fields in body: formData
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const data:any = await new Promise((resolve, reject) => {
    const form = new IncomingForm();

    form.parse(req, (err:any, fields:any, files:any) => {
      if (err) {
        console.log("not good");
        return reject(err)};
      resolve({ fields, files });
    });
  });

  const file = data?.files?.inputFile.filepath;

  try {
    const response = await cloudinary.uploader.upload(file, {
      resource_type: "video",
      public_id: `video_${new Date().getTime()}`
    });
    return res.json(response);
  } catch (error) {
    console.log("Error", error);
    return res.json(error);
  }

   
}