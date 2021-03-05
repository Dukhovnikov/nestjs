import { Module } from '@nestjs/common';
import { ContainersController } from './containers.controller';
import { ContainersService } from './containers.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ContainerSchema } from '../models/container.schema';

@Module({
  controllers: [ContainersController],
  providers: [ContainersService],
  imports: [
    MongooseModule.forFeature([{ name: 'Container', schema: ContainerSchema }]),
  ],
})
export class ContainersModule {}
