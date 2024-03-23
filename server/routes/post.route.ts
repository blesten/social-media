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

router.route('/:id/save').patch(isAuthenticated, postCtrl.savePost)
router.route('/:id/unsave').patch(isAuthenticated, postCtrl.unsavePost)
router.route('/:id/savedStatus').get(isAuthenticated, postCtrl.getUserSavedStatus)

export default router