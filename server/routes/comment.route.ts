import express from 'express'
import commentCtrl from './../controllers/commentCtrl'
import { isAuthenticated } from '../middlewares/auth'

const router = express.Router()

router.route('/').post(isAuthenticated, commentCtrl.create)

router.route('/post/:id').get(commentCtrl.read)

router.route('/:id')
  .patch(isAuthenticated, commentCtrl.update)
  .delete(isAuthenticated, commentCtrl.delete)

export default router