import {Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, ManyToMany, JoinColumn, ManyToOne, JoinTable} from 'typeorm';
import Record from './Record';
import Store from './Store';
import User from './User';

@Entity('products')
export default class Product {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column()
    name: string;
    @Column()
    price: number;

    @OneToOne(type => Record, record => record.product,{
        cascade: ['insert','update'],
        eager:true
    })
    @JoinColumn({name: 'record_id'})
    record: Record;

    @ManyToOne(() => Store, store =>  store.products)
    @JoinColumn({name: 'store_id'})
    store: Store;

    // @ManyToMany(type => User, user => user.products,{
    //     eager:true,
    //     cascade: ['insert', 'update']
    // })
    // @JoinTable(
    // //     {
    // //     name: 'users_products',
    // //     joinColumn: {
    // //         name: 'user_id',
    // //         referencedColumnName: 'id'
    // //     },
    // //     inverseJoinColumn: {
    // //         name: 'product_id',
    // //         referencedColumnName: 'id'
    // //     }
    // // }
    // )
    // users: User[];
}