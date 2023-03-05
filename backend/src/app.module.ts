import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ImageModule } from './image/image.module';

@Module({
  imports: [ImageModule, ConfigModule.forRoot()],
  controllers: [],
})
export class AppModule {}
