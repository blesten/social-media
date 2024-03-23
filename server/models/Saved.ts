import mongoose from 'mongoose'

const savedSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user'
  },
  posts: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'post'
    }
  ]
}, {
  timestamps: true
})

export default mongoose.model('saved', savedSchema)