import {Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, ManyToMany, JoinColumn, JoinTable} from 'typeorm';
import Product from './Product';
@Entity('users')
export default class User {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column()
    name: string;
    @Column()
    cpf: number;
    @Column()
    email: string;
    @Column()
    password: string;
    @ManyToMany(type => Product, product => product.users)
    @JoinTable()
    products: Product[];
}