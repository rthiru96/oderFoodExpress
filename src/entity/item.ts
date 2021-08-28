import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IItem } from '../interface/item.interface';


@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  itemName: string;

  @Column()
  price: number;

  @Column()
  qty: number;


  public static mockTestBoard(): IItem {
    const item: Item = {} as Item;
    item.id = 'ITM001';
    item.itemName = 'Pie';
    item.price = 20;
    item.qty = 2;
  
    return item;
  }
}
