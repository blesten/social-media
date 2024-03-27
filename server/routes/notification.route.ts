import express from 'express'
import notificationCtrl from './../controllers/notificationCtrl'
import { isAuthenticated } from './../middlewares/auth'

const router = express.Router()

router.route('/').get(isAuthenticated, notificationCtrl.getNotifications)

export default router