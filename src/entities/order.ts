// src/entities/order.ts

import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './user';
import { ICategory } from './category';


// Enum for order status
export enum OrderStatus {
    PENDING = 'Pending',
    IN_PROGRESS = 'In Progress',
    COMPLETED = 'Completed',
    CANCELLED = 'Cancelled',
  }
  
  // Enum for payment status
  export enum PaymentStatus {
    UNPAID = 'Unpaid',
    PAID = 'Paid',
    REFUNDED = 'Refunded',
  }

export interface IOrder extends Document {
  ticketID: string;
  dateCreated: Date;
  pickupDate: Date;
  categories: ICategory[];
  user: IUser;
  status: string;
  paymentStatus: string;
  amount: number
}
// Category sub-document schema
const CategorySchema = new Schema<ICategory>({
    name: { type: String, required: true },
    hasWhite: { type: Boolean, required: true },
    clothes: [
      {
        clotheType: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
  });
  

const OrderSchema: Schema = new Schema({
  ticketID: { type: String, required: true, unique: true },
  dateCreated: { type: Date, default: Date.now },
  pickupDate: { type: Date, required: true },
  categories: [CategorySchema],
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, default: OrderStatus.PENDING },
  paymentStatus: { type: String, default: PaymentStatus.UNPAID },
  amount: {type: Number, required: true}
});

export const Order = mongoose.model<IOrder>('Order', OrderSchema);


