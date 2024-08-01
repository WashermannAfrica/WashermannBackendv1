// src/services/orderService.ts

import { IOrder, Order } from '../entities/order';
import CreateOrder, { OrderData } from '../usecases/createOrder';
import OrderRepository from '../repositories/orderRepository';
import { generateEmailContent, sendEmail } from '../utils/emailSender';

class OrderService {
  private orderRepository: OrderRepository;

  constructor() {
    this.orderRepository = new OrderRepository();
  }

  public async createOrder(orderData: OrderData): Promise<IOrder> {
    const createOrderUseCase = new CreateOrder(this.orderRepository);
    const order = await createOrderUseCase.execute(orderData);

    console.log(orderData);
    // const createdOrder = orderData.user.email
    
      // Send email to the user
      await sendEmail(
        orderData.user.email,
        'Order Confirmation - Washerman',
        generateEmailContent(order, 'user')
      );
  
      // Send email to admin
      await sendEmail(
        'helloamaka01@gmail.com',
        'New Order Received - Washerman',
        generateEmailContent(order, 'admin')
      );

      return order;

  }

  public async getOrders(): Promise<IOrder[]> {
    return this.orderRepository.findAll();
  }

  public async getOrderByTicketID(ticketID: string): Promise<IOrder | null> {
    return this.orderRepository.findByTicketID(ticketID);
  }

}

export default OrderService;
