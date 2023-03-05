import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { ICloudinaryUploadResponse } from '../common/interfaces/uploadImage.interface';

@Injectable()
export class ImageService {
  constructor(private readonly configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get('CLOUDINARY_CLOUD_API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_CLOUD_API_SECRET'),
      secure: true,
    });
  }

  async tag(file: Express.Multer.File) {
    const { info } = await this.uploadImage(file, {
      categorization: 'google_tagging',
    });
    return {
      tags: info.categorization.google_tagging.data.map((el) => el.tag),
    };
  }

  async uploadImage(
    file: Express.Multer.File,
    options = {},
  ): Promise<ICloudinaryUploadResponse> {
    const imageResponse = await cloudinary.uploader.upload(
      this.base64_image(file),
      options,
    );
    return imageResponse as unknown as ICloudinaryUploadResponse;
  }

  async webshot(url: string) {
    const image = await cloudinary.uploader.explicit(url, { type: 'url2png' });
    return image;
  }

  base64_image(file: Express.Multer.File): string {
    const mimetype = file.mimetype;
    const base64 = file.buffer.toString('base64');
    const dataUri = `data:${mimetype};base64,${base64}`;
    return dataUri;
  }
}
