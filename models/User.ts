import {Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, ManyToMany, JoinColumn, JoinTable, BeforeInsert} from 'typeorm';
import bcrypt from 'bcrypt';
import Product from './Product';
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

    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password, 10);
    }

    async comparePassword(attempt: string): Promise<boolean> {
        return await bcrypt.compare(attempt, this.password);
    }
//     @ManyToMany(type => Product, product => product.users)
//     @JoinTable()
//     products: Product[];
 }