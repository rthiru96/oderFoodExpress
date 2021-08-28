import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IOrder } from '../interface/order.interface';
import { IItem } from '../interface/item.interface';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  orders: [];

  @Column()
  total: number;


  public static mockTestBoard(): IOrder {
    const order: Order = {} as IOrder;
    order.id = 'ODR1';
    order.orders = <any>[{
        id:"ITM002",
        itemName:"Pizza",
        qty:2,
        price:20,
      },{
        id:"ITM003",
        itemName:"Pie",
        qty:3,
        price:40,
      }];
    order.total = 200;
    return order;
  }
}
