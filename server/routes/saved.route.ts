import express from 'express'
import savedCtrl from './../controllers/savedCtrl'
import { isAuthenticated } from './../middlewares/auth'

const router = express.Router()

router.route('/').get(isAuthenticated, savedCtrl.getSavedPosts)

export default router