import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { fileFilter } from './helpers/fileFilter.helper';
import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Get } from '@nestjs/common';

@Controller('image')
@ApiTags('Image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get('filescan/:id')
  @ApiProperty()
  @ApiResponse({
    status: 201,
    description: 'File results',
  })
  fileResults(@Param('id') id: string) {
    return this.imageService.fileResults(id);
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

  @Post('bgremove')
  @ApiProperty()
  @ApiResponse({
    status: 201,
    description: 'Background removed!',
  })
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter,
    }),
  )
  backgroundRemove(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Make sure that the file is an image');
    }
    return this.imageService.removeImageBackground(file);
  }

  @Post('filescan')
  @ApiProperty()
  @ApiResponse({
    status: 201,
    description: 'File scanned!',
  })
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter,
    }),
  )
  fileScan(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Make sure that the file is an image');
    }
    return this.imageService.fileScan(file);
  }

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

  @Post('scanNotification')
  @ApiProperty()
  @ApiResponse({
    status: 201,
    description: 'Cloudinary scan notification!',
  })
  notification(@Body() body) {
    if (body.moderation_status) {
      return this.imageService.scanNotification(body);
    }
  }

  @Post('removetext')
  @ApiProperty()
  @ApiResponse({
    status: 201,
    description: 'Text removed!',
  })
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter,
    }),
  )
  removeText(@UploadedFile() file: Express.Multer.File) {
    return this.imageService.removeText(file);
  }
}
