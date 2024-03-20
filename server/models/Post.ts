import { IPost } from './../utils/interface'
import mongoose from 'mongoose'

const postSchema = new mongoose.Schema<IPost>({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user'
  },
  caption: {
    type: String,
    trim: true,
    required: true
  },
  images: [
    {
      type: String,
      required: true,
      trim: true
    }
  ],
  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'user'
    }
  ],
  comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'comment'
    }
  ]
}, {
  timestamps: true
})

export default mongoose.model<IPost>('post', postSchema)