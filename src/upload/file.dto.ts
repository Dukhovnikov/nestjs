import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class FileDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  alternativeText: string;

  @ApiProperty({ required: false })
  @IsOptional()
  caption?: string;

  @ApiProperty()
  hash: string;

  @ApiProperty()
  ext: string;

  @ApiProperty()
  mime: string;

  @ApiProperty()
  size: number;

  @ApiProperty()
  width: number;

  @ApiProperty()
  height: number;

  @ApiProperty()
  url: string;

  @ApiProperty()
  formats: any;

  @ApiProperty()
  provider: string;

  @ApiProperty()
  related: any[];

  @ApiProperty()
  createdAt: Date | string;

  @ApiProperty()
  updatedAt: Date | string;
}

export class FileUploadDto {
  @ApiProperty()
  fieldname: string;

  @ApiProperty()
  originalname: string;

  @ApiProperty()
  filename: string;

  @ApiProperty()
  encoding: string;

  @ApiProperty()
  mimetype: string;

  @ApiProperty()
  destination: string;

  @ApiProperty()
  path: string;

  @ApiProperty()
  size: number;
}
