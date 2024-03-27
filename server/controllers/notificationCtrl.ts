import { Response } from 'express'
import { IReqUser } from './../utils/interface'
import Notification from '../models/Notification'

const notificationCtrl = {
  getNotifications: async(req: IReqUser, res: Response) => {
    try {
      const notifications = await Notification.find({ user: req.user?._id }).sort('-createdAt').limit(3)

      return res.status(200).json({ notifications })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  }
}

export default notificationCtrl