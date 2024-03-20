import { Request } from 'express'
import { ObjectId, Date } from 'mongoose'

export interface IGeneralField {
  _id: string
  createdAt: Date
  updatedAt: Date
  _doc?: any
}

export interface IDecodedToken {
  id: string
}

export interface IUser extends IGeneralField {
  name: string
  username: string
  email: string
  password: string
  description: string
  avatar: string
  private: boolean
}

export interface IReqUser extends Request {
  user?: IUser
}

export interface IComment extends IGeneralField {
  user: ObjectId
  post: ObjectId
  content: string
}

export interface IPost extends IGeneralField {
  user: ObjectId
  caption: string
  images: string[]
  likes: ObjectId[]
  comments: ObjectId[]
}