// src/controllers/orderController.ts

import { Request, Response } from 'express';
import OrderService from '../services/orderService';

class OrderController {
  private orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  public async createOrder(req: Request, res: Response): Promise<void> {
    try {
        // Assuming the request body is already validated

        const orderData = req.body;        
        const order = await this.orderService.createOrder(orderData);
      res.status(201).json(order);
    } catch (error) {
      console.log(error);
      
      res.status(500).json({ error: 'Failed to create order' });
    }
  }

  public async getOrders(req: Request, res: Response): Promise<void> {
    try {
      const orders = await this.orderService.getOrders();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve orders' });
    }
  }

  public async getOrderByTicketID(req: Request, res: Response): Promise<void> {
    try {
      const { ticketID } = req.params;
      const order = await this.orderService.getOrderByTicketID(ticketID);
      if (order) {
        res.status(200).json(order);
      } else {
        res.status(404).json({ error: 'Order not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve order' });
    }
  }

}

export default OrderController;
