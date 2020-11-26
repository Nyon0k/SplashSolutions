import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne,JoinColumn} from 'typeorm';
import User from './User';
import Product from './Product';
@Entity('users_products')
export default class User_Product {
    @PrimaryGeneratedColumn()
    id: number;

    //Improvisação para um relacionamento Many-to-Many, deve haver implementação melhor.

    //Relacionamento One-to-Many entre User e Product.
    @ManyToOne(() => Product, product =>  product.users,{
        eager:true,
        cascade: ['insert','update']
    })
    @JoinColumn({name: 'product_id'})
    product: Product;

    //Relacionamento One-to-One entre User e Product.
    @ManyToOne(() => User, user =>  user.products,{
        eager:true,
        cascade: ['insert','update', 'remove']
    })
    @JoinColumn({name: 'user_id'})
    user: User;
    
 }