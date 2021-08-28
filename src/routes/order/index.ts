import { RouteInterface } from '..';
import { OrderController } from '../../controller/order.controller';

// upload file using multer like this
// import multer from 'multer';
// const fileUpload = multer();

interface OrderRoutesInterface extends RouteInterface {
  controller: typeof OrderController;
}

export const OrderRoutes: OrderRoutesInterface[] = [
  {
    method: 'get',
    route: '/orders',
    controller: OrderController,
    action: 'all',
  },
  {
    method: 'get',
    route: '/orders/:id',
    controller: OrderController,
    action: 'one',
  },
  {
    method: 'post',
    route: '/orders',
    controller: OrderController,
    action: 'save',
  },
  {
    method: 'delete',
    route: '/oders/:id',
    controller: OrderController,
    action: 'remove',
  },
];
