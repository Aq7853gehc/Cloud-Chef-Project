import mongoose, { Schema } from 'mongoose';
import { IOrder } from '@/types/type';



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

export const Order = mongoose.models.Order|| mongoose.model<IOrder>('Order', OrderSchema);
