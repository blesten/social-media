import express from 'express'
import postCtrl from './../controllers/postCtrl'
import { isAuthenticated } from './../middlewares/auth'

const router = express.Router()

router.route('/')
  .get(isAuthenticated, postCtrl.read)
  .post(isAuthenticated, postCtrl.create)

router.route('/user/:id').get(isAuthenticated, postCtrl.readUserPosts)

router.route('/:id')
  .patch(isAuthenticated, postCtrl.update)
  .delete(isAuthenticated, postCtrl.delete)

router.route('/:id/like').patch(isAuthenticated, postCtrl.likePost)
router.route('/:id/unlike').patch(isAuthenticated, postCtrl.unlikePost)

export default router