import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CountDto } from 'src/shared/count.dto';
import { FindAllQuery } from 'src/shared/find-query.dto';
import { DepoModel } from 'src/types/depo';
import { DeposDto } from './depos.dto';

@Injectable()
export class DeposService {
  constructor(@InjectModel('Depo') private depoModel: Model<DepoModel>) {}

  async findAllDepos(query: FindAllQuery): Promise<DeposDto[]> {
    return this.depoModel
      .find(query.options)
      .skip(query._start)
      .sort(query._sort)
      .limit(query._limit)
      .populate('actions')
      .populate('country')
      .populate('userprofiles')
      .populate('containers');
  }

  async find(id: string): Promise<DeposDto> {
    return this.depoModel
      .findById(id)
      .populate('actions')
      .populate('country')
      .populate('userprofiles')
      .populate('containers');
  }

  async count(): Promise<CountDto> {
    const count = await this.depoModel.countDocuments();
    return { count };
  }

  async create(depoDto: DeposDto): Promise<DeposDto> {
    const depo = new this.depoModel(depoDto);
    await depo.save();
    return this.depoModel
      .findById(depo._id)
      .populate('actions')
      .populate('country')
      .populate('userprofiles')
      .populate('containers');
  }

  async updateDepo(id: string, depoDto: DeposDto): Promise<DeposDto> {
    await this.depoModel.findByIdAndUpdate(
      id,
      { $set: depoDto },
      { useFindAndModify: false },
    );

    return this.depoModel
      .findById(id)
      .populate('actions')
      .populate('country')
      .populate('userprofiles')
      .populate('containers');
  }

  async delete(id: string): Promise<void> {
    await this.depoModel.findByIdAndDelete(id);
  }
}
