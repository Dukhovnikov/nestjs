import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ContainerModel } from '../types/container';
import { ContainerDto } from './container.dto';
import { FindAllQuery } from '../shared/find-query.dto';
import { CountDto } from '../shared/count.dto';

@Injectable()
export class ContainersService {
  constructor(
    @InjectModel('Container') private containerModel: Model<ContainerModel>,
  ) {}

  async findAllContainers(query: FindAllQuery): Promise<ContainerDto[]> {
    return this.containerModel
      .find(query.options)
      .skip(query._start)
      .sort(query._sort)
      .limit(query._limit)
      .populate('actions')
      .populate('depo');
  }

  async findOne(id: string): Promise<ContainerDto> {
    return this.containerModel
      .findById(id)
      .populate('actions')
      .populate('depo');
  }

  async findContainer(container: string): Promise<ContainerDto> {
    return this.containerModel
      .findOne({ containerNo: container })
      .populate('actions')
      .populate('depo');
  }

  async containerCount(): Promise<CountDto> {
    const count = await this.containerModel.countDocuments();
    return { count };
  }

  async create(containerDto: ContainerDto): Promise<ContainerDto> {
    const container = new this.containerModel(containerDto);
    await container.save();
    return container;
  }

  async update(id: string, containerDto: ContainerDto): Promise<ContainerDto> {
    await this.containerModel.findByIdAndUpdate(
      id,
      { $set: containerDto },
      { useFindAndModify: false },
    );

    return this.containerModel
      .findById(id)
      .populate('actions')
      .populate('depo');
  }

  async delete(id: string): Promise<void> {
    await this.containerModel.findByIdAndDelete(id);
  }
}
