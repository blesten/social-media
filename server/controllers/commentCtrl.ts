import { Request, Response } from 'express'
import { IReqUser } from './../utils/interface'
import Comment from './../models/Comment'
import Post from '../models/Post'

const commentCtrl = {
  create: async(req: IReqUser, res: Response) => {
    try {
      const { postId } = req.query
      const { content } = req.body

      if (!content)
        return res.status(400).json({ msg: 'Please provide comment content' })

      const post = await Post.findById(postId)
      if (!post)
        return res.status(404).json({ msg: 'Post not found.' })

      const comment = new Comment({
        user: req.user?._id,
        post: post._id,
        content,
        likes: []
      })
      await comment.save()

      return res.status(200).json({
        msg: 'Comment posted',
        comment
      })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  read: async(req: Request, res: Response) => {
    try {
      const { postId } = req.query

      const post = await Post.findById(postId)
      if (!post)
        return res.status(404).json({ msg: 'Post notn found.' })

      const comments = await Comment.find({ post: post._id }).populate('user').select('-password').sort('-createdAt')

      return res.status(200).json({ comments })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  update: async(req: IReqUser, res: Response) => {
    try {
      const { id } = req.params
      const { content } = req.body

      if (!content)
        return res.status(400).json({ msg: 'Please provide comment content.' })

      const comment = await Comment.findById(id)
      if (!comment)
        return res.status(404).json({ msg: 'Comment not found.' }) 

      comment.content = content
      await comment.save()

      return res.status(200).json({ msg: 'Comment content has been updated successfully.' })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  delete: async(req: IReqUser, res: Response) => {
    try {
      const { id } = req.params

      const comment = await Comment.findById(id)
      if (!comment)
        return res.status(404).json({ msg: 'Comment not found.' })

      await Comment.findByIdAndDelete(id)

      return res.status(200).json({ msg: 'Comment has been deleted successfully.' })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  like: async(req: IReqUser, res: Response) => {
    try {
      const { id } = req.params

      const comment = await Comment.findById(id)
      if (!comment)
        return res.status(404).json({ msg: 'Comment not found.' })

      const newLikes = [...comment.likes, req.user?._id]
      // @ts-ignore
      comment.likes = newLikes
      await comment.save()

      return res.status(200).json({ msg: 'Comment liked.' })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  unlike: async(req: IReqUser, res: Response) => {
    try {
      const { id } = req.params

      const comment = await Comment.findById(id)
      if (!comment)
        return res.status(404).json({ msg: 'Comment not found.' })

      const newLikes = comment.likes.filter(item => String(item) !== String(req.user?._id))
      comment.likes = newLikes
      await comment.save()

      return res.status(200).json({ msg: 'Comment unliked.' })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  }
}

export default commentCtrl