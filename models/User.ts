import {Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, ManyToMany, JoinColumn, JoinTable, BeforeInsert} from 'typeorm';
import bcrypt from 'bcrypt';
import Product from './Product';
import User_Product from './User_Product';
import Image from './Image';

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

    //Relacionamento One-to-Many entre User e tabela pivot User_product.
    @OneToMany(() => User_Product, user_product =>  user_product.user, {
        cascade: ['insert','update'],
    })
    @JoinColumn({name: 'product_id'})
    products: User_Product[];

    //Relacionamento One-to-Many entre User e Image
    @OneToMany(() => Image, image => image.user, {
        cascade: ['insert', 'update']
    })
    images: Image[];

    //Antes de criar um User na tabela, encripta a senha que foi passada.
    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password, 10);
    }
    //compara a senha recebida com a senha do usuário atual na hora do login
    async comparePassword(attempt: string): Promise<boolean> {
        return await bcrypt.compare(attempt, this.password);
    }

 }