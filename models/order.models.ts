import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  recipe: mongoose.Types.ObjectId[];
  totalAmount: number;
  status: 'pending' | 'completed' | 'canceled';
}

const OrderSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    recipe: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Menu',
        required: true
      }
    ],
    totalAmount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'canceled'],
      default: 'pending'
    }
  },
  { timestamps: true }
);

export const Order =  mongoose.model<IOrder>('Order', OrderSchema);
