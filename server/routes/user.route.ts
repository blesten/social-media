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
router.route('/changePassword').patch(isAuthenticated, userCtrl.changePassword)
router.route('/changeAccountPrivacy').patch(isAuthenticated, userCtrl.changeAccountPrivacy)
router.route('/checkForgetPasswordToken').get(userCtrl.checkForgetPasswordToken)
router.route('/followRequests').get(isAuthenticated, userCtrl.getFollowRequests)
router.route('/search').get(isAuthenticated, userCtrl.searchUser)
router.route('/:id').get(isAuthenticated, userCtrl.getProfile)
router.route('/:id/follow').patch(isAuthenticated, userCtrl.follow)
router.route('/:id/unfollow').patch(isAuthenticated, userCtrl.unfollow)
router.route('/:id/accept').patch(isAuthenticated, userCtrl.acceptFollowRequest)
router.route('/:id/followers').get(isAuthenticated, userCtrl.getFollowers)
router.route('/:id/followings').get(isAuthenticated, userCtrl.getFollowings)

export default router