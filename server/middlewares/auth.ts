import { Response, NextFunction } from 'express'
import { IReqUser, IDecodedToken } from './../utils/interface'
import User from './../models/User'
import jwt from 'jsonwebtoken'

export const isAuthenticated = async(req: IReqUser, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')
    if (!token)
      return res.status(403).json({ msg: 'Access forbidden.' })

    const decoded = <IDecodedToken>jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`)
    if (!decoded.id)
      return res.status(403).json({ msg: 'Access forbidden.' })

    const user = await User.findById(decoded.id)
    if (!user)
      return res.status(403).json({ msg: 'Access forbidden.' })

    req.user = user
    next()
  } catch (err: any) {
    return res.status(500).json({ msg: err.message })
  }
}