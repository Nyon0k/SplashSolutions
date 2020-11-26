import {Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, ManyToMany, JoinColumn} from 'typeorm';
import Product from './Product';
@Entity('records')
export default class Record {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    type: string;

    @Column()
    amount_available: number;

    @Column()
    phone: number;

    //Relacionamento One-to-One entre Record e Product.
    @OneToOne(type => Product, product => product.record)
    product: Product;
}