import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  createdAt: string;
  user: mongoose.Types.ObjectId;
  items: mongoose.Types.ObjectId[];
  totalAmount: number;
  status: 'pending' | 'completed' | 'canceled';
}

const OrderSchema: Schema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Cart',
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

export const Order = mongoose.models.Order|| mongoose.model<IOrder>('Order', OrderSchema);
