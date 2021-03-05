import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FindAllQuery } from 'src/shared/find-query.dto';
import { ActionModel } from 'src/types/action';
import { ActionDto } from './action.dto';
import { CountDto } from '../shared/count.dto';

@Injectable()
export class ActionsService {
  constructor(@InjectModel('Action') private actionModel: Model<ActionModel>) {}

  async findAllActions(query: FindAllQuery): Promise<ActionDto[]> {
    return this.actionModel
      .find(query.options)
      .skip(query._start)
      .sort(query._sort)
      .limit(query._limit)
      .populate('depo')
      .populate('userprofile')
      .populate('container');
  }

  async create(actionDto: ActionDto): Promise<ActionDto> {
    const action = new this.actionModel(actionDto);
    await action.save();
    return this.actionModel
      .findById(action._id)
      .populate('depo')
      .populate('userprofile')
      .populate('container');
  }

  async findOne(id: string): Promise<ActionDto> {
    return this.actionModel
      .findById(id)
      .populate('depo')
      .populate('userprofile')
      .populate('container');
  }

  async actionCount(): Promise<CountDto> {
    const count = await this.actionModel.countDocuments();
    return { count };
  }

  async update(id: string, actionDto: ActionDto): Promise<ActionDto> {
    await this.actionModel.findByIdAndUpdate(
      id,
      { $set: actionDto },
      { useFindAndModify: false },
    );

    return this.actionModel
      .findById(id)
      .populate('depo')
      .populate('userprofile')
      .populate('container');
  }

  async delete(id: string): Promise<void> {
    const filter = { _id: id };
    await this.actionModel.findOneAndDelete(filter);
  }
}
