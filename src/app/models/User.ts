import { model, Schema } from 'mongoose';

export const User = model('User', new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userLevel: {
    type: String,
    enum: ['NORMAL', 'MOD', 'ADM'],
    default: 'NORMAL',
    required: true
  },
  verificationCode: {
    type: String,
    required: false
  },
  imagePath: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
}));
