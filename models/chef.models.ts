import { IChef } from "@/types/type";
import mongoose, { model, Schema } from "mongoose";

const chefSchema = new Schema<IChef>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      validate: {
        validator: async function (value) {
          const user = await mongoose.model("User").findById(value);
          return user && user.role === "chef";
        },
        message: 'User must have role="chef"',
      },
    },
    menu: [
      {
        type: Schema.Types.ObjectId,
        ref: "Menu",
        required: true,
        validate: {
          validator: async function (value) {
            const menu = await mongoose.model("Menu").findById(value);
            return menu && menu.createdBy.equals(this.user);
          },
          message: "Menu must be associated with the chef",
        },
      },
    ],
    rating: { type: Number, default: 0 },
    acceptedOrders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

export default model<IChef>("Chef", chefSchema);
