// src/repositories/orderRepository.ts

import { Order, IOrder, PaymentStatus, OrderStatus } from '../entities/order';
import { User, IUser } from '../entities/user';
import { Category, ICategory } from '../entities/category';

interface IOrderRepository {
  create(order: IOrder): Promise<IOrder>;
  findById(id: string): Promise<IOrder | null>;
  findAll(): Promise<IOrder[]>;
}

class OrderRepository implements IOrderRepository {


 
    async create(order: IOrder): Promise<IOrder> {



        const user = await User.findOneAndReplace(
            { phoneNumber: order.user.phoneNumber }, // Find by email
            { ...order.user }, // Update with new user data
            { new: true, upsert: true, setDefaultsOnInsert: true } // Options: return new doc if updated, create if not found
          );
    
        // Create and save the order
        const newOrder = new Order({
          ...order,
          user: user._id,
          amount: order.amount,
          categories: order.categories,
          paymentStatus: PaymentStatus.UNPAID,
          status: OrderStatus.PENDING,
        });
    
        await newOrder.save();
        return newOrder;
      }
    
  
      async findById(id: string): Promise<IOrder | null> {
        return Order.findById(id).populate('user').populate('categories');
      }

      
  async findByTicketID(ticketID: string): Promise<IOrder | null> {
    return Order.findOne({ ticketID }).populate('user');
  }

    
      async findAll(): Promise<IOrder[]> {
        return Order.find().populate('user').populate('categories');
      }
}

export default OrderRepository;
