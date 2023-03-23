import { model, Schema } from 'mongoose';

export const Order = model('Order', new Schema({
  status: {
    type: String,
    enum: ['WAITING', 'IN_PRODUCTION', 'DONE', 'CANCELED'],
    default: 'WAITING'
  },
  payment: {
    type: String,
    enum: ['Pix', 'Card', 'Cash'],
    default: 'Cash',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  items: {
    required: true,
    type: [{
      item: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Item',
      },
      quantity: {
        type: Number,
        default: 1
      }
    }]
  }
}));
