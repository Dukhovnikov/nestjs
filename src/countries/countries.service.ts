import { Injectable } from '@nestjs/common';
import { CountryDto } from './country.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CountryModel } from '../types/country';
import { FindAllQuery } from '../shared/find-query.dto';
import { CountDto } from '../shared/count.dto';

@Injectable()
export class CountriesService {
  constructor(
    @InjectModel('Country') private countryModel: Model<CountryModel>,
  ) {}

  async findAllCountries(query: FindAllQuery): Promise<CountryDto[]> {
    return this.countryModel
      .find(query.options)
      .skip(query._start)
      .sort(query._sort)
      .limit(query._limit)
      .populate('depos')
      .populate('users');
  }

  async findCountry(id: string): Promise<CountryDto> {
    return this.countryModel
      .findById(id)
      .populate('depos')
      .populate('users');
  }

  async countCountry(): Promise<CountDto> {
    const count = await this.countryModel.countDocuments();
    return { count };
  }

  async createCountry(countryDto: CountryDto): Promise<CountryDto> {
    const country = new this.countryModel(countryDto);
    await country.save();
    return this.countryModel
      .findById(country._id)
      .populate('depos')
      .populate('users');
  }

  async updateCountry(id: string, countryDto: CountryDto): Promise<CountryDto> {
    await this.countryModel.findByIdAndUpdate(
      id,
      { $set: countryDto },
      { useFindAndModify: false },
    );

    return this.countryModel
      .findById(id)
      .populate('depos')
      .populate('users');
  }

  async deleteCountry(id: string): Promise<void> {
    await this.countryModel.findByIdAndDelete(id);
  }
}
