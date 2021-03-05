import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiDefaultResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Error } from '../shared/error.dto';
import { FindQueryPipe } from '../shared/find-query.pipe';
import { CountryDto } from './country.dto';
import { CountriesService } from './countries.service';
import { JwtGuard } from '../auth/jwt.guard';
import { FindAllQuery } from '../shared/find-query.dto';
import { CountDto } from '../shared/count.dto';

@ApiTags('Country')
@Controller('countries')
export class CountriesController {
  constructor(private countryService: CountriesService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOperation({ description: 'Find all the countries records' })
  @ApiOkResponse({
    description: 'Retrieve containers document(s)',
    type: [CountryDto],
  })
  @ApiForbiddenResponse({ description: 'Forbidden', type: Error })
  @ApiNotFoundResponse({ description: 'Not found', type: Error })
  @ApiDefaultResponse({ description: 'unexpected error', type: Error })
  @UsePipes(new FindQueryPipe())
  find(@Query() query: FindAllQuery): Promise<CountryDto[]> {
    return this.countryService.findAllCountries(query);
  }

  @Get('count')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOkResponse({
    description: 'Retrieve document(s) count',
    type: CountDto,
  })
  @ApiForbiddenResponse({ description: 'Forbidden', type: Error })
  @ApiNotFoundResponse({ description: 'Not found', type: Error })
  @ApiDefaultResponse({ description: 'unexpected error', type: Error })
  count(): Promise<CountDto> {
    return this.countryService.countCountry();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOkResponse({
    description: 'Retrieve country document(s)',
    type: CountryDto,
  })
  @ApiForbiddenResponse({ description: 'Forbidden', type: Error })
  @ApiNotFoundResponse({ description: 'Not found', type: Error })
  @ApiDefaultResponse({ description: 'unexpected error', type: Error })
  findOne(@Param('id') id: string): Promise<CountryDto> {
    return this.countryService.findCountry(id);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOperation({ description: 'Create a new profile record' })
  @ApiCreatedResponse({
    description: 'Retrieve profile document(s)',
    type: CountryDto,
  })
  @ApiForbiddenResponse({ description: 'Forbidden', type: Error })
  @ApiNotFoundResponse({ description: 'Not found', type: Error })
  @ApiDefaultResponse({ description: 'unexpected error', type: Error })
  create(@Body() countryDto: CountryDto): Promise<CountryDto> {
    return this.countryService.createCountry(countryDto);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOperation({ description: 'Update a single country record' })
  @ApiOkResponse({
    description: 'Retrieve country document(s)',
    type: CountryDto,
  })
  @ApiForbiddenResponse({ description: 'Forbidden', type: Error })
  @ApiNotFoundResponse({ description: 'Not found', type: Error })
  @ApiDefaultResponse({ description: 'unexpected error', type: Error })
  update(
    @Param('id') id: string,
    @Body() countryDto: CountryDto,
  ): Promise<CountryDto> {
    return this.countryService.updateCountry(id, countryDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOperation({ description: 'Delete a single country record' })
  @ApiOkResponse({
    description: 'deletes a single country based on the ID supplied',
  })
  @ApiForbiddenResponse({ description: 'Forbidden', type: Error })
  @ApiNotFoundResponse({ description: 'Not found', type: Error })
  @ApiDefaultResponse({ description: 'unexpected error', type: Error })
  delete(@Param('id') id: string): Promise<void> {
    return this.countryService.deleteCountry(id);
  }
}
