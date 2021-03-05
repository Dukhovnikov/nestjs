import { Module } from '@nestjs/common';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CountrySchema } from '../models/country.schema';

@Module({
  controllers: [CountriesController],
  providers: [CountriesService],
  imports: [
    MongooseModule.forFeature([{ name: 'Country', schema: CountrySchema }]),
  ],
})
export class CountriesModule {}
