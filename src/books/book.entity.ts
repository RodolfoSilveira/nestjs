
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Photo } from '../photos/photo.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  title: string;

  @Column('text')
  description: string;

  @Column()
  publishing_company: string;

  @Column()
  language: string;

  @Column()
  pages: string;

  @OneToMany(type => Photo, photo => photo.book)
  photos: Photo[];
}
