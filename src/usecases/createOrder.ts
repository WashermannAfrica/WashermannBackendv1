// src/usecases/createOrder.ts

import { ICategory } from '../entities/category';
import { Order, IOrder, PaymentStatus, OrderStatus } from '../entities/order';
import { IUser } from '../entities/user';
import OrderRepository from '../repositories/orderRepository';
import { generateTicketID } from '../utils/generateTicketID';

export interface OrderData {
    user: IUser;
    pickupDate: Date;
    categories: ICategory[];
    amount: number;
  }

class CreateOrder {
  private orderRepository: OrderRepository;

  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }

  public async execute(orderData: OrderData): Promise<IOrder> {
   // Map raw data to an IOrder object
   const order: Partial<IOrder> = {
    ticketID: generateTicketID(),
    dateCreated: new Date(),
    pickupDate: orderData.pickupDate,
    categories: orderData.categories,
    user: orderData.user,
    amount: orderData.amount,
    paymentStatus: PaymentStatus.UNPAID,
    status: OrderStatus.PENDING,
  };
  return this.orderRepository.create(order as IOrder);
}

}

export default CreateOrder;
