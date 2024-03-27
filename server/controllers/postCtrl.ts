import { Response } from 'express'
import { IReqUser } from './../utils/interface' 
import Post from './../models/Post'
import Follower from '../models/Follower'
import Following from '../models/Following'
import User from '../models/User'
import Saved from '../models/Saved'
import Comment from '../models/Comment'
import Notification from '../models/Notification'

const postCtrl = {
  // create notification
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

      const userFollowers = await Follower.findOne({ user: req.user?._id })
      if (!userFollowers)
        return res.status(404).json({ msg: 'User followers not found.' })
      
      const followers = userFollowers.followers
      const filteredFollowers = followers.filter(item => item.status === 1)

      for (let i = 0; i < filteredFollowers.length; i++) {
        const notification = new Notification({
          user: filteredFollowers[i].user,
          avatar: req.user?.avatar,
          username: req.user?.username,
          message: 'just post a photo, don\'t miss out',
        })
        await notification.save()
      }

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
  readUserPosts: async(req: IReqUser, res: Response) => {
    try {
      const { id } = req.params

      const user = await User.findById(id)
      if (!user)
        return res.status(404).json({ msg: 'User not found.' })

      const userFollowers = await Follower.findOne({ user: id })
      if (!userFollowers)
        return res.status(404).json({ msg: 'User follower not found.' })

      const filteredUserFollowers = userFollowers.followers.filter(item => item.status === 1)

      // if (!user.private || String(req.user?._id) === String(id) || filteredUserFollowers.some(item => String(item.user) === String(req.user?._id))) {
        const posts = await Post.find({ user: id }).populate('user').select('-password').sort('-createdAt')
        return res.status(200).json({ posts })
      // }

      // return res.status(400).json({ msg: 'Account is private' })
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

      return res.status(200).json({ msg: 'Post has been updated successfully.', post })
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

      await Comment.deleteMany({ post: id })

      return res.status(200).json({ msg: 'Post has been deleted successfully.' })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  likePost: async(req: IReqUser, res: Response) => {
    try {
      const { id } = req.params

      const post = await Post.findById(id)
      if (!post)
        return res.status(404).json({ msg: 'Post not found.' })

      const findLikes = post.likes.some(item => String(item) === String(req.user?._id))
      if (findLikes)
        return res.status(400).json({ msg: 'Post liked.' })

      const newLikes: any[] = [...post.likes, req.user?._id]
      post.likes = newLikes
      await post.save()

      return res.status(200).json({ msg: 'Post liked.' })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  unlikePost: async(req: IReqUser, res: Response) => {
    try {
      const { id } = req.params

      const post = await Post.findById(id)
      if (!post)
        return res.status(404).json({ msg: 'Post not found.' })

      const newLikes: any[] = post.likes.filter(item => String(item) !== String(req.user?._id))
      post.likes = newLikes
      await post.save()

      return res.status(200).json({ msg: 'Post unliked.' })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  savePost: async(req: IReqUser, res: Response) => {
    try {
      const { id } = req.params

      const post = await Post.findById(id)
      if (!post)
        return res.status(404).json({ msg: 'Post not found.' })

      const userSaved = await Saved.findOne({ user: req.user?._id })
      if (!userSaved)
        return res.status(404).json({ msg: 'User saved not found.' })

      const savedPost = [...userSaved.posts, post._id]
      // @ts-ignore
      userSaved.posts = savedPost
      await userSaved.save()

      return res.status(200).json({ msg: 'Post saved.' })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  unsavePost: async(req: IReqUser, res: Response) => {
    try {
      const { id } = req.params

      const post = await Post.findById(id)
      if (!post)
        return res.status(404).json({ msg: 'Post not found.' })

      const userSaved = await Saved.findOne({ user: req.user?._id })
      if (!userSaved)
        return res.status(404).json({ msg: 'User saved not found.' })

      const savedPost = userSaved.posts.filter(item => String(item) !== String(id))
      // @ts-ignore
      userSaved.posts = savedPost
      await userSaved.save()

      return res.status(200).json({ msg: 'Post unsaved.' })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getUserSavedStatus: async(req: IReqUser, res: Response) => {
    try {
      const { id } = req.params

      const post = await Post.findById(id)
      if (!post)
        return res.status(404).json({ msg: 'Post not found' })

      const userSaved = await Saved.findOne({ user: req.user?._id })
      if (!userSaved)
        return res.status(404).json({ msg: 'User saved not found.' })

      const savedStatus = userSaved.posts.some(item => String(item) === String(id))

      return res.status(200).json({ savedStatus })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  }
}

export default postCtrl