import { model, Schema } from 'mongoose';

export const Cupom = model('Cupom', new Schema({
  code: {
    type: String,
    required: true
  },
  discount: {
    type: Number,
    required: true
  },
  discountType: {
    type: String,
    enum: ['percentage', 'fixed'],
    default: 'percentage'
  },
  expirationDate: {
    type: Date,
    required: true
  },
  minPurchaseValue: {
    type: Number,
    default: 0
  },
  maxDiscountValue: {
    type: Number,
    default: 0
  },
  firstPurchaseOnly: {
    type: Boolean,
    default: false
  },
  cupomUsed: {
    type: Number,
    default: 0
  }
}));
