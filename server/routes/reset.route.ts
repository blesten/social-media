import express from 'express'
import resetCtrl from '../controllers/resetCtrl'

const router = express.Router()

router.route('/').get(resetCtrl.resetData)

export default router