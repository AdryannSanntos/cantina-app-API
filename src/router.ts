import path from 'node:path';
import multer from 'multer';

import { Router } from 'express';
import { createCategory } from './app/useCases/Category/createCategory';
import { listCategories } from './app/useCases/Category/listCategories';
import { listItems } from './app/useCases/Item/listItems';
import { listOrders } from './app/useCases/Order/listOrders';
import { listUsers } from './app/useCases/User/listUsers';
import { createItem } from './app/useCases/Item/createItem';
import { createUser } from './app/useCases/User/createUser';
import { createOrder } from './app/useCases/Order/createOrder';
import { cancelOrder } from './app/useCases/Order/cancelOrder';
import { changeOrderStatus } from './app/useCases/Order/changeOrderStatus';
import { listItemByCategory } from './app/useCases/Category/itemByCategory';
import { changeUserPassword } from './app/useCases/User/changeUserPassword';
import { changeUserLevel } from './app/useCases/User/changeUserLevel';
import { deleteUser } from './app/useCases/User/deleteUser';
import { loginUser } from './app/useCases/User/loginUser';
import { updatePassword } from './app/useCases/User/updateUserPassword';
import { forgetUserPassword } from './app/useCases/User/forgetUserPassword';


export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(res, file, callback) {
      callback(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    }
  })
});

const userUpload = multer({
  storage: multer.diskStorage({
    destination(res, file, callback) {
      callback(null, path.resolve(__dirname, '..', 'userUploads'));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    }
  })
});

// List categories
router.get('/categories', listCategories);

// Create category
router.post('/categories', createCategory);

// List Items
router.get('/item', listItems);

// Create item
router.post('/item', upload.single('image'), createItem);

// Get items by category
router.get('/categories/:categoryId/items', listItemByCategory);

// List Orders
router.get('/order', listOrders);

// Create Order
router.post('/order', createOrder);

// Change order status
router.patch('/order/:orderId', changeOrderStatus);

// Delete-cancel order
router.delete('/order/:orderId', cancelOrder);

// List Users
router.get('/user', listUsers);

// Login User
router.post('/user/login', loginUser);

// Delete Users
router.delete('/user/:userId', deleteUser);

// Create User
router.post('/user', userUpload.single('image'), createUser);

// Change User Password (forgot)
router.patch('/user/forget-password', forgetUserPassword);

// Change User Password (update)
router.patch('/user/update/:userId', changeUserPassword);

// Change User Level
router.patch('/user/level/:userId', changeUserLevel);
