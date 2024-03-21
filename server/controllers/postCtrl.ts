import { Request, Response } from 'express'
import { IReqUser } from './../utils/interface' 
import Post from './../models/Post'

const postCtrl = {
  create: async(req: IReqUser, res: Response) => {
    try {
      const { caption, images } = req.body
      
      if (!caption || !images)
        return res.status(400).json({ msg: 'Please provide post caption and images.' })

      if (images.length < 1)
        return res.status(400).json({ msg: 'Post should contain at least 1 image.' })

      const post = new Post({
        user: req.user?._id,
        caption,
        images
      })
      await post.save()

      return res.status(200).json({
        msg: 'Post has been created successfully.',
        post
      })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  read: async(req: Request, res: Response) => {
    try {
      
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  update: async(req: IReqUser, res: Response) => {
    try {
      
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  delete: async(req: IReqUser, res: Response) => {
    try {
      
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  readLikeStatus: async(req: IReqUser, res: Response) => {
    try {
      
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  changeLikeStatus: async(req: IReqUser, res: Response) => {
    try {
      
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  }
}

export default postCtrl