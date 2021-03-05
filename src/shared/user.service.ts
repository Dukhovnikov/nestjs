import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserModel } from '../types/user';
import { InjectModel } from '@nestjs/mongoose';
import { SignInDto, SignUpDto } from '../auth/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from '../auth/jwt.payload';
import { UpdateUserDto, UserDto } from './user.dto';
import { FindAllQuery } from './find-query.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserModel>) {}

  private static sanitizeUser(user: UserModel): UserDto {
    const obj = user.toObject();
    delete obj.password;
    return obj;
  }

  async create(userDto: SignUpDto) {
    const { email } = userDto;
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new HttpException(
        'User email already in use',
        HttpStatus.BAD_REQUEST,
      );
    }

    const createdUser = new this.userModel(userDto);
    await createdUser.save();
    return UserService.sanitizeUser(
      await this.userModel.findById(createdUser._id),
    );
  }

  async findByLogin(userDto: SignInDto): Promise<UserDto> {
    const { email, password } = userDto;
    const user = await this.userModel
      .findOne({ email })
      .select('+password')
      .exec();

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return UserService.sanitizeUser(user);
  }

  async findByEmail(payload: JwtPayload): Promise<UserDto> {
    const { email } = payload;
    return this.userModel.findOne({ email });
  }

  async findAllUsers(query: FindAllQuery): Promise<UserDto[]> {
    return this.userModel
      .find(query.options)
      .populate('userprofile')
      .skip(query._start)
      .sort(query._sort)
      .limit(query._limit);
  }

  async findOne(id: string): Promise<UserDto> {
    const user = await this.userModel
      .findById(id)
      .populate('role')
      .populate('userprofile');
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async updateUser(id: string, userDto: UpdateUserDto): Promise<UserDto> {
    await this.userModel.findByIdAndUpdate(
      id,
      { $set: userDto },
      { useFindAndModify: false },
    );

    return this.userModel.findById(id);
  }

  async deleteUser(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id);
  }
}
