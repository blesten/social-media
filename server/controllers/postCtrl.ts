import { Response } from 'express'
import { IReqUser } from './../utils/interface' 
import Post from './../models/Post'
import Follower from '../models/Follower'
import Following from '../models/Following'

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
        post: {
          ...post._doc,
          user: {
            name: req.user?.name,
            avatar: req.user?.avatar,
            _id: req.user?._id
          }
        }
      })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  read: async(req: IReqUser, res: Response) => {
    try {
      const userFollowers = await Follower.findOne({ user: req.user?._id })
      if (!userFollowers)
        return res.status(404).json({ msg: 'User followers not found.' })

      const filteredUserFollowers = userFollowers.followers.filter(item => item.status === 1)

      const userFollowings = await Following.findOne({ user: req.user?._id })
      if (!userFollowings)
        return res.status(404).json({ msg: 'User followings not found.' })

      const filteredUserFollowings = userFollowings.followings.filter(item => item.status === 1)
      
      const usersList: any[] = [req.user?._id]

      for (let i = 0; i < filteredUserFollowers.length; i++) {
        const userID = filteredUserFollowers[i].user
        if (!usersList.includes(userID))
          usersList.push(userID)
      }

      for (let i = 0; i < filteredUserFollowings.length; i++) {
        const userID = filteredUserFollowings[i].user
        if (!usersList.includes(userID))
          usersList.push(userID)
      }

      const posts = await Post.find({ user: { $in: usersList } }).populate('user').select('-password').sort('-createdAt')

      return res.status(200).json({ posts })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  update: async(req: IReqUser, res: Response) => {
    try {
      const { id } = req.params
      const { caption, images } = req.body
      
      const post = await Post.findOne({ _id: id, user: req.user?._id })
      if (!post)
        return res.status(404).json({ msg: 'Post not found.' })

      if (!caption || !images)
        return res.status(400).json({ msg: 'Please provide post caption and images.' })

      if (images.length < 1)
        return res.status(400).json({ msg: 'Post should contain at least 1 image.' })

      post.caption = caption
      post.images = images
      await post.save()

      return res.status(200).json({ msg: 'Post has been updated successfully.' })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  delete: async(req: IReqUser, res: Response) => {
    try {
      const { id } = req.params

      const post = await Post.findOne({ _id: id, user: req.user?._id })
      if (!post)
        return res.status(404).json({ msg: 'Post not found.' })

      await Post.findByIdAndDelete(id)

      // delete all saved post

      return res.status(200).json({ msg: 'Post has been deleted successfully.' })
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