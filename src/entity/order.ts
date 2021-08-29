import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IOrder } from '../interface/order.interface';
import { IItem } from '../interface/item.interface';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('jsonb', {nullable: true})
  orders: object[];

  @Column()
  total: number;


  public static mockTestBoard(): IOrder {
    const order: Order = {} as IOrder;
 
    order.orders = <any>[{
        id:"ITM007",
        qty:2,
        price:20,
        itemName:"Pizza"
      },{
        id:"ITM009",
        qty:3,
        price:40,
        itemName:"Pie"
      }];
    order.total = 200;
    return order;
  }
}
