import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './photo.entity';
import { Repository } from 'typeorm';
import { IPhoto } from './photo.interface';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo) private readonly photoRepository: Repository<IPhoto>
  ){}

  async findAll(): Promise<IPhoto[]>{
    try {
      return await this.photoRepository.find()
    } catch (err) {
      throw new InternalServerErrorException(err.message)
    }
  }

  async create(photo: IPhoto): Promise<IPhoto> {
    try {
      return await this.photoRepository.save(photo)
    } catch (err) {
      throw new InternalServerErrorException(err.message)
    }
  }
}
