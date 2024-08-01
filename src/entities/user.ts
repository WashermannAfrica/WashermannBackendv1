// src/entities/user.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  phoneNumber: string;
  pickupAddress: string;
  deliveryAddress: string;
  email: string;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  pickupAddress: { type: String, required: true },
  deliveryAddress: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

export const User = mongoose.model<IUser>('User', UserSchema);
