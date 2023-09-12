import mongoose, { Schema, Model, Document} from "mongoose";

const videoSchema : Schema = new mongoose.Schema({
  postId: {
    type: String,
    required: true,
    unique: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  dateUploaded: {
    type: String,
    required: true,
  },
  videoLink: {
    type: String,
    required: true,
  }
});


export interface IVideo extends Document{
  userEmail: String,
  dateUploaded: String,
  postId: String,
  videoLink: String
}


  const Video:Model<IVideo> = mongoose.models.Video || mongoose.model<IVideo>('Video', videoSchema);
export default Video;
