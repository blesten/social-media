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
  }
}

export default userCtrl