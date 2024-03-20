import mongoose from 'mongoose'

const mailTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user'
  },
  expired: {
    type: Date,
    required: true
  },
  used: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

export default mongoose.model('mailToken', mailTokenSchema)