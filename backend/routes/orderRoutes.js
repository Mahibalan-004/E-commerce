import express from 'express'
const router = express.Router()

import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  updateOrderToUPIPending,
  approveUPIPayment,
} from '../controllers/orderController.js'

import { protect, admin } from '../middleware/authMiddleware.js'

// Order Routes
router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)

// UPI Manual Payment Routes
router.route('/:id/pay/upi').put(protect, updateOrderToUPIPending)
router.route('/:id/pay/approve').put(protect, admin, approveUPIPayment)

export default router
