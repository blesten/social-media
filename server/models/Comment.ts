import { IComment } from './../utils/interface'
import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema<IComment>({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user'
  },
  post: {
    type: mongoose.Types.ObjectId,
    ref: 'post'
  },
  content: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
})

export default mongoose.model<IComment>('comment', commentSchema)