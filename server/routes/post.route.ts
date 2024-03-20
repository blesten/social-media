import express from 'express'
import postCtrl from './../controllers/postCtrl'
import { isAuthenticated } from './../middlewares/auth'

const router = express.Router()

router.route('/')
  .get(postCtrl.read)
  .post(isAuthenticated, postCtrl.create)

router.route('/:id')
  .patch(isAuthenticated, postCtrl.update)
  .delete(isAuthenticated, postCtrl.delete)

router.route('/:id/like')
  .get(isAuthenticated, postCtrl.readLikeStatus)
  .patch(isAuthenticated, postCtrl.changeLikeStatus)

export default router