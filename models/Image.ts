import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import User from './User';
@Entity('images')
export default class Image {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;

    //Relacionamento One-to-Many entre Image e User.
    @ManyToOne(() => User, user => user.images)
    @JoinColumn({name: 'user_id'})
    user: User;

}