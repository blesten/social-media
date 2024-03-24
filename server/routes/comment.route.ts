import express from 'express'
import commentCtrl from './../controllers/commentCtrl'
import { isAuthenticated } from '../middlewares/auth'

const router = express.Router()

router.route('/')
  .get(commentCtrl.read)
  .post(isAuthenticated, commentCtrl.create)

router.route('/:id')
  .patch(isAuthenticated, commentCtrl.update)
  .delete(isAuthenticated, commentCtrl.delete)

router.route('/:id/like').patch(isAuthenticated, commentCtrl.like)
router.route('/:id/unlike').patch(isAuthenticated, commentCtrl.unlike)

export default router