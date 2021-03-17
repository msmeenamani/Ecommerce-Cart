import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, index: { unique: true, dropDups: true }, required: true },
  price: { type: Number, required: true },
  deleted: { type: Boolean, default: false}
})

export const ItemModel = mongoose.model('item', ItemSchema)