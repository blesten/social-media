import { IUser } from './../utils/interface'
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  description: {
    type: String,
    default: ''
  },
  avatar: {
    type: String,
    default: ''
  },
  private: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

export default mongoose.model<IUser>('user', userSchema)