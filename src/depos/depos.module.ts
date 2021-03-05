import { Module } from '@nestjs/common';
import { DeposController } from './depos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DepoSchema } from '../models/depo.schema';
import { DeposService } from './depos.service';

@Module({
  controllers: [DeposController],
  imports: [MongooseModule.forFeature([{ name: 'Depo', schema: DepoSchema }])],
  providers: [DeposService],
})
export class DeposModule {}
