import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Repository } from 'typeorm';
import { IBook } from './book.interface';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<IBook>
  ){}

  async findAll(): Promise<IBook[]> {
    try {
      return await this.bookRepository.find();
    } catch(err){
      throw new InternalServerErrorException(err.message);
    }
  }

  async findOne(book: IBook): Promise<IBook> {
    try {
      return await this.bookRepository.findOne(book);
    } catch(err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async create(book: IBook): Promise<IBook> {
    try {
      return await this.bookRepository.save(book)
    } catch(err) {
      throw new InternalServerErrorException(err.message)
    }
  }

  async update(id: IBook, book: IBook, ): Promise<void> {
    try {
      await this.bookRepository.update(id, book)
    } catch(err) {
      throw new InternalServerErrorException(err.message)
    }
  }

  async delete(id: IBook): Promise<void> {
    try {
      await this.bookRepository.delete(id)
    } catch(err) {
      throw new InternalServerErrorException(err.message)
    }
  }
}
