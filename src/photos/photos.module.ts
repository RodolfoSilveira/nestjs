import { Module } from '@nestjs/common';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './photo.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([Photo]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [PhotosController],
  providers: [PhotosService]
})
export class PhotosModule {}
