import mongoose from 'mongoose'

const followerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user'
  },
  followers: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
      },
      status: {
        type: Number,
        required: true
      }
    }
  ]
}, {
  timestamps: true
})

export default mongoose.model('follower', followerSchema)