import { Controller, Get, Post, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { FilesInterceptor } from '@nestjs/platform-express'
import { IPhoto } from './photo.interface';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photoService: PhotosService){}

  @Get()
  async index() {
    return this.photoService.findAll()
  }

  @Post()
  @UseInterceptors(FilesInterceptor('image'))
  store(@UploadedFiles() files: any) {
    console.log(files)
  }
}
