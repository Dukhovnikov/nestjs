import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { Exclude, Transform } from 'class-transformer';

export class FindAllQuery {
  @ApiProperty({
    description: 'Maximum number of results possible',
    type: 'integer',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Transform(value => parseInt(value))
  _limit?: number;

  @ApiProperty({
    description: 'Sort according to a specific field.',
    required: false,
  })
  @IsOptional()
  _sort?: string;

  @ApiProperty({
    description:
      'Skip a specific number of entries (especially useful for pagination)',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  @Transform(value => parseInt(value))
  _start?: number;

  @ApiProperty({
    name: '=',
    description: 'Get entries that matches exactly your input',
    required: false,
  })
  @IsOptional()
  _eq?: string;

  @ApiProperty({
    description: 'Get records that are not equals to something',
    required: false,
  })
  @IsOptional()
  _ne?: string;

  @ApiProperty({
    description: 'Get record that are lower than a value',
    required: false,
  })
  @IsOptional()
  _lt?: string;

  @ApiProperty({
    description: 'Get records that are lower than or equal to a value',
    required: false,
  })
  @IsOptional()
  _lte?: string;

  @ApiProperty({
    description: 'Get records that are greater than a value',
    required: false,
  })
  @IsOptional()
  _gt?: string;

  @ApiProperty({
    description: 'Get records that are greater than or equal a value',
    required: false,
  })
  @IsOptional()
  _gte?: string;

  @ApiProperty({
    description: 'Get records that contains a value',
    required: false,
  })
  @IsOptional()
  _contains?: string;

  @ApiProperty({
    description: 'Get records that contains (case sensitive) a value',
    required: false,
  })
  @IsOptional()
  _containss?: string;

  @ApiProperty({
    description: 'Get records that matches any value in the array of values',
    required: false,
    type: [String],
  })
  @IsOptional()
  _in?: string[];

  @ApiProperty({
    description:
      "Get records that doesn't match any value in the array of values",
    required: false,
    type: [String],
  })
  @IsOptional()
  _nin?: string[];

  @Exclude()
  options: any;
}
