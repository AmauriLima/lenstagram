import {
  Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import { User } from './User';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  description: string

  @Column()
  user_id: string

  @JoinColumn({ name: 'user_id' })
  @OneToMany(() => User, (user) => user.id)
  user: User;

  @Column()
  url_img: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
