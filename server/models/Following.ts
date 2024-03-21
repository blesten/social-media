import mongoose from 'mongoose'

const followingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user'
  },
  followings: [
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

export default mongoose.model('following', followingSchema)