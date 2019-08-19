import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { IUser } from './user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService){}

  @Get()
  async index() {
    return this.userService.findAll()
  }

  @Get(':id')
  async show(@Param() params: any) {
    return this.userService.findOne(params.id)
  }

  @Post()
  async store(@Body() user: IUser) {
    return this.userService.create(user)
  }

  @Put(':id')
  async update(@Param() params: any, @Body() user: IUser) {
    return this.userService.update(params.id, user)
  }

  @Delete(':id')
  async destroy(@Param() params: any) {
    return this.userService.delete(params.id)
  }
}
