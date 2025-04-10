import mongoose, { Schema, Document } from 'mongoose';

export interface ICartItem {
  recipe: mongoose.Types.ObjectId;
  quantity: number;
}

export interface ICart extends Document {
  user: mongoose.Types.ObjectId;
  items: ICartItem[];
}

const CartSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    items: [
      {
        recipe: {
          type: Schema.Types.ObjectId,
          ref: 'Menu'
        },
        quantity: {
          type: Number,
          required: true,
          min: 1
        }
      }
    ]
  },
  { timestamps: true }
);

export const Cart =  mongoose.model<ICart>('Cart', CartSchema);
