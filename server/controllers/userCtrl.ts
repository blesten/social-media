import { Request, Response } from 'express'
import { IDecodedToken, IReqUser } from './../utils/interface'
import { validEmail, validPassword } from '../utils/validator'
import { generateToken } from '../utils/generateToken'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import User from './../models/User'
import MailToken from '../models/MailToken'
import sendEmail from '../utils/mail'
import Follower from '../models/Follower'
import Following from '../models/Following'

const userCtrl = {
  register: async(req: Request, res: Response) => {
    try {
      const {
        name,
        username,
        email,
        password
      } = req.body

      if (!name || !username || !email || !password)
        return res.status(400).json({ msg: 'Plaese provide all required field.' })

      if (!validEmail(email))
        return res.status(400).json({ msg: 'Please provide valid email address.' })

      if (!validPassword(password))
        return res.status(400).json({ msg: 'Password should be at least 8 characters and should contain capital letter and symbol.' })

      const usernameFound = await User.findOne({ username })
      if (usernameFound)
        return res.status(400).json({ msg: 'Username has been used before.' })

      const emailFound = await User.findOne({ email })
      if (emailFound)
        return res.status(400).json({ msg: 'Email has been used before.' })

      const passwordHash = await bcrypt.hash(password, 12)

      const user = new User({
        name,
        username,
        email,
        password: passwordHash
      })
      await user.save()

      const follower = new Follower({
        user: user._id,
        followers: []
      })
      await follower.save()

      const following = new Following({
        user: user._id,
        followings: []
      })
      await following.save()

      return res.status(200).json({ msg: 'User has been successfully registered.' })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  login: async(req: Request, res: Response) => {
    try {
      const { username, password } = req.body
      
      if (!username || !password)
        return res.status(400).json({ msg: 'Please provide username and password to login.' })

      const user = await User.findOne({ username })
      if (!user)
        return res.status(401).json({ msg: 'Invalid credential.' })

      const passwordMatched = await bcrypt.compare(password, user.password)
      if (!passwordMatched)
        return res.status(401).json({ msg: 'Invalid credential.' })

      const accessToken = generateToken({ id: user._id }, 'accessToken')
      const refreshToken = generateToken({ id: user._id }, 'refreshToken')

      res.cookie('socialSphere_cookie', refreshToken, {
        httpOnly: true,
        path: '/api/v1/users/refresh_token',
        maxAge: 30 * 24 * 60 * 60 * 1000
      })

      return res.status(200).json({
        msg: `Authenticated as ${user.name}`,
        accessToken,
        user: {
          ...user._doc,
          password: ''
        }
      })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  logout: async(req: Request, res: Response) => {
    try {
      res.clearCookie('socialSphere_cookie', {
        path: '/api/v1/users/refresh_token'
      })

      return res.status(200).json({ msg: 'Logout success.' })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  refreshToken: async(req: Request, res: Response) => {
    try {
      const { socialSphere_cookie: token } = req.cookies

      if (!token) 
        return res.status(401).json({ msg: 'Invalid credential.' })

      const decoded = <IDecodedToken>jwt.verify(token, `${process.env.REFRESH_TOKEN_SECRET}`)
      if (!decoded.id)
        return res.status(401).json({ msg: 'Invalid credential.' })

      const user = await User.findById(decoded.id)
      if (!user)
        return res.status(401).json({ msg: 'Invalid credential.' })

      const accessToken = generateToken({ id: user._id }, 'accessToken')
      const refreshToken = generateToken({ id: user._id }, 'refreshToken')

      res.cookie('socialSphere_cookie', refreshToken, {
        path: '/api/v1/users/refresh_token',
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000
      })

      return res.status(200).json({
        accessToken,
        user: {
          ...user._doc,
          password: ''
        }
      })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  forgetPassword: async(req: Request, res: Response) => {
    try {
      const { email } = req.query
      const user = await User.findOne({ email })

      if (!email)
        return res.status(400).json({ msg: 'Please provide email address to reset password.' })
      else if (!validEmail(`${email}`))
        return res.status(400).json({ msg: 'Please provide valid email address.' })

      if (!user)
        return res.status(404).json({ msg: 'Provided email address is not registered at our system.' })

      const mailToken = crypto.randomBytes(32).toString('hex')
      const newMailToken = new MailToken({
        token: mailToken,
        user: user._id,
        expired: new Date(new Date().getTime() + 15 * 60 * 1000)
      })
      await newMailToken.save()

      await sendEmail(`${email}`, `${process.env.CLIENT_URL}/reset-password?token=${mailToken}`, 'Forgot Your Password? No Worries!', user.name)
      
      return res.status(200).json({ msg: `An email with reset password subject has been sent to ${email}` })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  resetPassword: async(req: Request, res: Response) => {
    try {
      const { token, password } = req.body
      const mailToken = await MailToken.findOne({ token })

      if (!token)
        return res.status(400).json({ msg: 'Please provide forget password token.' })
      else if (!mailToken)
        return res.status(404).json({ msg: 'Forget password token not registered at our system.' })
      else if (mailToken.used === 1)
        return res.status(400).json({ msg: 'Forget password token has been used before.' })
      else if (new Date() > mailToken.expired)
        return res.status(400).json({ msg: 'Forget password link has exppired.' })

      const user = await User.findById(mailToken.user)
      if (!user)
        return res.status(404).json({ msg: 'User not found.' })

      if (!validPassword(password))
        return res.status(400).json({ msg: 'Password should be at least 8 characters and should contain capital letter and symbol.' })

      const newPassword = await bcrypt.hash(password, 12)

      user.password = newPassword
      await user.save()

      mailToken.used = 1
      await mailToken.save()

      return res.status(200).json({ msg: `${user.email} password has been reset successfully.` })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  checkForgetPasswordToken: async(req: Request, res: Response) => {
    try {
      const { token } = req.query
      const mailToken = await MailToken.findOne({ token, used: 0 })
      if (!mailToken)
        return res.status(404).json({ msg: 'Forget password token is invalid.' })

      if (new Date() > mailToken.expired)
        return res.status(400).json({ msg: 'Forget password token is invalid.' })

      return res.status(200).json({ success: true })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  editProfile: async(req: IReqUser, res: Response) => {
    try {
      const { avatar, name, username, description } = req.body
      if (!name || !username)
        return res.status(400).json({ msg: 'Please provide account name and username.' })

      const user = await User.findById(req.user?._id)
    
      const usernameFound = await User.findOne({ username }, { $ne: { _id: req.user?._id } })
      if (usernameFound)
        return res.status(400).json({ msg: 'Username has been used before.' })

      await User.findByIdAndUpdate(req.user?._id, {
        avatar,
        name,
        username,
        description
      })

      return res.status(200).json({
        msg: 'Profile has been updated successfully.',
        user: {
          ...user?._doc,
          avatar,
          name,
          username,
          description,
          password: ''
        }
      })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  changePassword: async(req: IReqUser, res: Response) => {
    try {
      const { currentPassword, newPassword } = req.body

      if (!currentPassword || !newPassword)
        return res.status(400).json({ msg: 'Please provide all requried field.' })

      if (!validPassword(newPassword))
        return res.status(400).json({ msg: 'Password should be at least 8 characters and should contain capital letter and symbol.' })

      const user = await User.findById(req.user?._id)
      if (!user)
        return res.status(401).json({ msg: 'Invalid credential.' })

      const currentPasswordMatched = await bcrypt.compare(currentPassword, user.password)
      if (!currentPasswordMatched)
        return res.status(400).json({ msg: 'Current password is incorrect.' })

      const passwordHash = await bcrypt.hash(newPassword, 12)

      user.password = passwordHash
      await user.save()

      return res.status(200).json({ msg: 'Password has been changed successfully.' })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  changeAccountPrivacy: async(req: IReqUser, res: Response) => {
    try {
      const { privacyStatus } = req.body

      const user = await User.findById(req.user?._id)
      if (!user)
        return res.status(401).json({ msg: 'Invalid credential.' })

      user.private = privacyStatus
      await user.save()

      return res.status(200).json({ msg: 'Account privacy status has been changed successfully.' })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getProfile: async(req: Request, res: Response) => {
    try {
      const { id } = req.params

      const user = await User.findById(id)
      if (!user)
        return res.status(404).json({ msg: 'User not found.' })

      return res.status(200).json({
        user: {
          ...user._doc,
          password: ''
        }
      })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  follow: async(req: IReqUser, res: Response) => {
    try {
      const { id } = req.params

      const user = await User.findById(id)
      if (!user)
        return res.status(404).json({ msg: 'User not found.' })

      const currentUserFollowings = await Following.findOne({ user: req.user?._id })
      const targetUserFollowers = await Follower.findOne({ user: id })

      if (!currentUserFollowings)
        return res.status(404).json({ msg: 'User followings not found.' })

      if (!targetUserFollowers)
        return res.status(404).json({ msg: 'Target followers not found.' })

      const targetUserPrivacyStatus = user.private
      
      if (targetUserPrivacyStatus) {
        const newFollowing = {
          user: id,
          status: 0
        }

        const currentUserFollowingsList = currentUserFollowings.followings
        currentUserFollowingsList.push(newFollowing)

        currentUserFollowings.followings = currentUserFollowingsList
        await currentUserFollowings.save()

        const newFollower = {
          user: req.user?._id,
          status: 0
        }

        const targetUserFollowersList = targetUserFollowers.followers
        targetUserFollowersList.push(newFollower)
        
        targetUserFollowers.followers = targetUserFollowersList
        await targetUserFollowers.save()
      } else {
        const newFollowing = {
          user: id,
          status: 1
        }

        const currentUserFollowingsList = currentUserFollowings.followings
        currentUserFollowingsList.push(newFollowing)

        currentUserFollowings.followings = currentUserFollowingsList
        await currentUserFollowings.save()

        const newFollower = {
          user: req.user?._id,
          status: 1
        }

        const targetUserFollowersList = targetUserFollowers.followers
        targetUserFollowersList.push(newFollower)
        
        targetUserFollowers.followers = targetUserFollowersList
        await targetUserFollowers.save()
      }

      return res.status(200).json({ msg: 'Successfully followed.' })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  unfollow: async(req: IReqUser, res: Response) => {
    try {
      const { id } = req.params

      const user = await User.findById(id)
      if (!user)
        return res.status(404).json({ msg: 'User not found.' })
      
      const currentUserFollowings = await Following.findOne({ user: req.user?._id })
      const targetUserFollowers = await Follower.findOne({ user: id })

      if (!currentUserFollowings)
        return res.status(404).json({ msg: 'User followings not found.' })

      if (!targetUserFollowers)
        return res.status(404).json({ msg: 'Target followers not found.' })

      let currentUserFollowingsList = currentUserFollowings.followings
      // @ts-ignore
      currentUserFollowingsList = currentUserFollowingsList.filter(item => String(item.user) !== String(id))

      currentUserFollowings.followings = currentUserFollowingsList
      await currentUserFollowings.save()

      let targetUserFollowersList = targetUserFollowers.followers
      // @ts-ignore
      targetUserFollowersList = targetUserFollowersList.filter(item => String(item.user) !== String(req.user?._id))

      targetUserFollowers.followers = targetUserFollowersList
      await targetUserFollowers.save()

      return res.status(200).json({ msg: 'Succesfully unfollowed.' })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  acceptFollowRequest: async(req: IReqUser, res: Response) => {
    try {
      const { id } = req.params

      const user = await User.findById(id)
      if (!user)
        return res.status(404).json({ msg: 'User not found.' })

      const currentUserFollowers = await Follower.findOne({ user: req.user?._id })
      if (!currentUserFollowers)
        return res.status(404).json({ msg: 'User followers not found.' })

      const targetUserFollowings = await Following.findOne({ user: id })
      if (!targetUserFollowings)
        return res.status(404).json({ msg: 'User followings not found.' })

      let currentUserFollowersList = currentUserFollowers.followers
      // @ts-ignore
      currentUserFollowersList = currentUserFollowersList.map(item => String(item.user) === String(id) ? { ...item, status: 1 } : item)

      currentUserFollowers.followers = currentUserFollowersList
      await currentUserFollowers.save()

      let targetUserFollowingsList = targetUserFollowings.followings
      // @ts-ignore
      targetUserFollowingsList = targetUserFollowingsList.map(item => String(item.user) === String(req.user?._id) ? { ...item, status: 1 } : item)

      targetUserFollowings.followings = targetUserFollowingsList
      await targetUserFollowings.save()

      return res.status(200).json({ msg: 'Successfully accepted.' })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getFollowers: async(req: IReqUser, res: Response) => {
    try {
      const { id } = req.params

      const user = await User.findById(id)
      if (!user)
        return res.status(404).json({ msg: 'User not found.' })

      if (user.private && String(id) !== String(req.user?._id))
        return res.status(400).json({ msg: 'Resource not allowed.' })

      const followers = await Follower.findOne({ user: id }).populate('followers.user').select('-password')

      const filteredFollowers = followers?.followers.filter(item => item.status === 1)
      
      return res.status(200).json({ followers: filteredFollowers })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getFollowings: async(req: IReqUser, res: Response) => {
    try {
      const { id } = req.params
      
      const user = await User.findById(id)
      if (!user)
        return res.status(404).json({ msg: 'User not found.' })

      if (user.private && String(id) !== String(req.user?._id))
        return res.status(400).json({ msg: 'Resource not allowed.' })

      const followings = await Following.findOne({ user: id }).populate('followings.user').select('-password')

      const filteredFollowings = followings?.followings.filter(item => item.status === 1)

      return res.status(200).json({ followings: filteredFollowings })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getFollowRequests: async(req: IReqUser, res: Response) => {
    try {
      const followRequests = await Follower.findOne({ user: req.user?._id }).populate('followers.user').select('-password')

      const filteredFollowRequests = followRequests?.followers.filter(item => item.status === 0)

      return res.status(200).json({ followRequests: filteredFollowRequests })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  }
}

export default userCtrl