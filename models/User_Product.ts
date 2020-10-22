import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne,JoinColumn} from 'typeorm';
import User from './User';
import Product from './Product';
@Entity('users_products')
export default class User_Product {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => Product, product =>  product.users,{
        eager:true,
        cascade: ['insert','update']
    })
    @JoinColumn({name: 'product_id'})
    product: Product;

    @ManyToOne(() => User, user =>  user.products,{
        eager:true,
        cascade: ['insert','update', 'remove']
    })
    @JoinColumn({name: 'user_id'})
    user: User;
    
 }