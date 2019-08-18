import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { BooksService } from './books.service';
import { IBook } from './book.interface';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService){}

  @Get()
  async index(){
    return await this.bookService.findAll();
  }

  @Get(':id')
  async show(@Param() params: any) {
    return await this.bookService.findOne(params.id);
  }

  @Post()
  async store(@Body() book: IBook){
    return await this.bookService.create(book);
  }

  @Put(':id')
  async update(@Body() book: IBook, @Param() params: any){
    return await this.bookService.update(params.id, book)
  }

  @Delete(':id')
  async destroy(@Param() params: any) {
    return await this.bookService.delete(params.id)
  }
}
