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
    route: '/order',
    controller: OrderController,
    action: 'all',
  },
  {
    method: 'get',
    route: '/order/:id',
    controller: OrderController,
    action: 'one',
  },
  {
    method: 'post',
    route: '/order',
    controller: OrderController,
    action: 'save',
  },
  {
    method: 'delete',
    route: '/oder/:id',
    controller: OrderController,
    action: 'remove',
  },
];
