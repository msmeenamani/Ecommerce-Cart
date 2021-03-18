import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PromotionSchema = new Schema({
  itemId: { type: String, index: { unique: true} },
  itemName: { type: String, index: { unique: true, dropDups: true }, required: true },
  discountType: { type: String, required: true },
  discountDetails: { type: Object, required: true }
})

export const PromotionModel = mongoose.model('promotion', PromotionSchema)