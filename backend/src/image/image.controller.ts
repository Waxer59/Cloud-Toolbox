import {
  BadRequestException,
  Controller,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { fileFilter } from './helpers/fileFilter.helper';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';
import { Get } from '@nestjs/common';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('tag')
  @ApiProperty()
  @ApiResponse({
    status: 201,
    description: 'Tags created!',
  })
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

  @Get('webshot')
  @ApiProperty()
  @ApiResponse({
    status: 201,
    description: 'Webshot!',
  })
  webshot(@Query('url') url: string) {
    if (!url) {
      throw new BadRequestException('You must send the query parameter "url"');
    }
    return this.imageService.webshot(url);
  }
}
