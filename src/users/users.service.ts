import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { IUser } from './user.interface';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { secret } from '../config/auth';

function generateToken (params = {}): string {
  return jwt.sign(params, secret, {
    expiresIn: 86400
  })
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<IUser>)
  {}

  async findAll(): Promise<IUser[]> {
    try {
      return await this.userRepository.find()
    } catch(err) {
      throw new InternalServerErrorException(err.message)
    }
  }

  async findOne(user: IUser): Promise<IUser> {
    try {
      return await this.userRepository.findOne(user)
    } catch(err) {
      throw new InternalServerErrorException(err.message)
    }
  }

  async create(users: IUser): Promise<any> {
    try {
      const { name, password, email } = users

      const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

      const user = await this.userRepository.save({name, email, password: hash})

      user.password = undefined

      const dados = { user, token: generateToken({ id: user.id })}

      return dados
    } catch(err) {
      throw new InternalServerErrorException(err.message)
    }
  }

  async update(id: IUser, users: IUser): Promise<void> {
    try{
      const { name, password, email } = users

      const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

      await this.userRepository.update(id, {name, email, password: hash})

    }catch(err){
      throw new InternalServerErrorException(err.message)
    }
  }

  async delete(id: IUser): Promise<void> {
    try {
      await this.userRepository.delete(id)
    } catch(err) {
      throw new InternalServerErrorException(err.message)
    }
  }
}
