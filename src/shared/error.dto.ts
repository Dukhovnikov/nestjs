import { ApiProperty } from '@nestjs/swagger';

export class Error {
  @ApiProperty()
  code: number;

  @ApiProperty()
  message: string;
}
