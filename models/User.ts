import {Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, ManyToMany, JoinColumn, JoinTable, BeforeInsert} from 'typeorm';
import bcrypt from 'bcrypt';
import Product from './Product';
import User_Product from './User_Product';
@Entity('users')
export default class User {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column()
    name: string;
    @Column()
    cpf: string;
    @Column()
    email: string;
    @Column()
    password: string;

    @OneToMany(() => User_Product, user_product =>  user_product.user, {
        cascade: ['insert','update'],
    })
    @JoinColumn({name: 'product_id'})
    products: User_Product[];

    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password, 10);
    }

    async comparePassword(attempt: string): Promise<boolean> {
        return await bcrypt.compare(attempt, this.password);
    }

 }