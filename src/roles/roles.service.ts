import { Injectable } from '@nestjs/common';
import { CreateRolesDto, RolesDto, UpdateRolesDto } from './roles.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoleModel } from '../types/role';
import { FindAllQuery } from '../shared/find-query.dto';

@Injectable()
export class RolesService {
  constructor(@InjectModel('Role') private roleModel: Model<RoleModel>) {}

  async findAllRoles(query: FindAllQuery): Promise<RolesDto[]> {
    return this.roleModel
      .find(query.options)
      .skip(query._start)
      .sort(query._sort)
      .limit(query._limit)
      .populate('users')
      .populate('permissions');
  }

  async findRole(id: string): Promise<RolesDto> {
    return this.roleModel
      .findById(id)
      .populate('users')
      .populate('permissions');
  }

  async createRole(rolesDto: CreateRolesDto): Promise<RolesDto> {
    const role = new this.roleModel(rolesDto);
    await role.save();
    return this.roleModel
      .findById(role._id)
      .populate('users')
      .populate('permissions');
  }

  async updateRole(id: string, rolesDto: UpdateRolesDto): Promise<RolesDto> {
    await this.roleModel.findByIdAndUpdate(
      id,
      { $set: rolesDto },
      { useFindAndModify: false },
    );
    return this.roleModel
      .findById(id)
      .populate('users')
      .populate('permissions');
  }

  async deleteRole(id: string): Promise<void> {
    await this.roleModel.findByIdAndDelete(id);
  }
}
