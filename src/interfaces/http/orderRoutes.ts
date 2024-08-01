// src/interfaces/http/orderRoutes.ts

import { Router } from 'express';
import OrderController from '../../controllers/orderController';
import { createOrderValidationRules } from '../../validators/orderValidator';
import { validate } from '../../middleware/validationMiddleware';

const router = Router();
const orderController = new OrderController();

router.post('/', createOrderValidationRules(), validate, (req: any, res: any) => orderController.createOrder(req, res));
router.get('/', (req, res) => orderController.getOrders(req, res));
router.get('/:ticketID', orderController.getOrderByTicketID.bind(orderController));


export default router;
