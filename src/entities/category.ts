// src/entities/category.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IClothingItem {
  clotheType: string;
  quantity: number;
}

export interface ICategory extends Document {
  name: string;
  hasWhite: boolean;
  clothes: IClothingItem[];
}

const ClothingItemSchema: Schema = new Schema({
  clotheType: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const CategorySchema: Schema = new Schema({
  name: { type: String, required: true },
  hasWhite: { type: Boolean, required: true },
  clothes: { type: [ClothingItemSchema], required: true },
});

export const Category = mongoose.model<ICategory>('Category', CategorySchema);
