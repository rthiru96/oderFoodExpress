import { OrderRoutes } from './order';

export interface RouteInterface {
  method: string;
  route: string;
  action: string;
  uploadType?: any;
}
export const Routes = [...OrderRoutes];
