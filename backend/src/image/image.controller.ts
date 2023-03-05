import {
  BadRequestException,
  Controller,
  Get,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { fileFilter } from './helpers/fileFilter.helper';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get('tag')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter,
    }),
  )
  tag(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Make sure that the file is an image');
    }
    return this.imageService.tag(file);
  }
}
