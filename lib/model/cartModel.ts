import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

let ItemSchema = new Schema(
  {
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity can not be less then 1."],
    },
    price: {
      type: Number,
      required: true,
    }
  }
);

const CartSchema = new Schema(
  {
    items: [ItemSchema]
  }
);
export const CartModel = mongoose.model('cart', CartSchema)