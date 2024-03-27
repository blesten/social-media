import { Response } from 'express'
import { IReqUser } from './../utils/interface'
import Saved from '../models/Saved'

const savedCtrl = {
  getSavedPosts: async(req: IReqUser, res: Response) => {
    try {
      const savedPosts = await Saved.findOne({ user: req.user?._id }).populate({
        path: 'posts',
        populate: {
          path: 'user',
          select: '-password'
        }
      })

      return res.status(200).json({ savedPosts })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  }
}

export default savedCtrl