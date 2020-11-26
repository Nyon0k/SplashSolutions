import {Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, ManyToMany, JoinColumn, JoinTable} from 'typeorm';

import Product from './Product';
@Entity('stores')
export default class Store {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column()
    name: string;
    @Column()
    address: string;
    @Column()
    cep: string;
    @Column()
    cnpj: string;

    //Relacionamento One-to-Many entre Store e Product.
    @OneToMany(() => Product, product =>  product.store, {
        cascade: ['insert','update'],
        eager: true
    })
    @JoinColumn({name: 'store_id'})
    products: Product[];
}