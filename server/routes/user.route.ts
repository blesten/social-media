import express from 'express'
import userCtrl from './../controllers/userCtrl'
import { isAuthenticated } from './../middlewares/auth'

const router = express.Router()

router.route('/register').post(userCtrl.register)
router.route('/login').post(userCtrl.login)
router.route('/logout').get(userCtrl.logout)
router.route('/refresh_token').get(userCtrl.refreshToken)
router.route('/forgetPassword').get(userCtrl.forgetPassword)
router.route('/resetPassword').patch(userCtrl.resetPassword)
router.route('/editProfile').patch(isAuthenticated, userCtrl.editProfile)
router.route('/changePasswword').patch(isAuthenticated, userCtrl.changePassword)
router.route('/changeAccountPrivacy').patch(isAuthenticated, userCtrl.changeAccountPrivacy)
router.route('/checkForgetPasswordToken').get(userCtrl.checkForgetPasswordToken)

export default router