import { Module } from '@nestjs/common';
import { ActionsController } from './actions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ActionSchema } from '../models/action.schema';
import { ActionsService } from './actions.service';

@Module({
  controllers: [ActionsController],
  providers: [ActionsService],
  imports: [
    MongooseModule.forFeature([{ name: 'Action', schema: ActionSchema }]),
  ],
})
export class ActionsModule {}
