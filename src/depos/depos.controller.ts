import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiDefaultResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CountDto } from 'src/shared/count.dto';
import { FindAllQuery } from 'src/shared/find-query.dto';
import { FindQueryPipe } from 'src/shared/find-query.pipe';
import { DeposDto } from './depos.dto';
import { DeposService } from './depos.service';

@ApiTags('Depos')
@Controller('depos')
export class DeposController {
  constructor(private depoService: DeposService) {}

  @Get()
  @ApiOperation({ description: "Find all the depos's records" })
  @ApiOkResponse({
    description: 'Retrieve depos document(s)',
    type: [DeposDto],
  })
  @ApiForbiddenResponse({ description: 'Forbidden', type: Error })
  @ApiNotFoundResponse({ description: 'Not found', type: Error })
  @ApiDefaultResponse({ description: 'unexpected error', type: Error })
  @UsePipes(new FindQueryPipe())
  all(@Query() query: FindAllQuery): Promise<DeposDto[]> {
    return this.depoService.findAllDepos(query);
  }

  @Post()
  @ApiOperation({ description: 'Create a new depos record' })
  @ApiCreatedResponse({
    description: 'Retrieve depos document(s)',
    type: DeposDto,
  })
  @ApiForbiddenResponse({ description: 'Forbidden', type: Error })
  @ApiNotFoundResponse({ description: 'Not found', type: Error })
  @ApiDefaultResponse({ description: 'unexpected error', type: Error })
  create(@Body() depoDto: DeposDto): Promise<DeposDto> {
    return this.depoService.create(depoDto);
  }

  @Get('/count')
  @ApiOperation({ description: 'Retrieve the number of depos documents' })
  @ApiOkResponse({
    description: 'Retrieve depos document(s)',
    type: CountDto,
  })
  @ApiForbiddenResponse({ description: 'Forbidden', type: Error })
  @ApiNotFoundResponse({ description: 'Not found', type: Error })
  @ApiDefaultResponse({ description: 'unexpected error', type: Error })
  count(): Promise<CountDto> {
    return this.depoService.count();
  }

  @Get(':id')
  @ApiOperation({ description: 'Find one depos record' })
  @ApiOkResponse({
    description: 'Retrieve depos document(s)',
    type: DeposDto,
  })
  @ApiForbiddenResponse({ description: 'Forbidden', type: Error })
  @ApiNotFoundResponse({ description: 'Not found', type: Error })
  @ApiDefaultResponse({ description: 'unexpected error', type: Error })
  find(@Param('id') id: string): Promise<DeposDto> {
    return this.depoService.find(id);
  }

  @Put(':id')
  @ApiOperation({ description: 'Update a single depos record' })
  @ApiOkResponse({
    description: 'Retrieve depos document(s)',
    type: DeposDto,
  })
  @ApiForbiddenResponse({ description: 'Forbidden', type: Error })
  @ApiNotFoundResponse({ description: 'Not found', type: Error })
  @ApiDefaultResponse({ description: 'unexpected error', type: Error })
  update(
    @Param('id') id: string,
    @Body() depoDto: DeposDto,
  ): Promise<DeposDto> {
    return this.depoService.updateDepo(id, depoDto);
  }

  @Delete(':id')
  @ApiOperation({ description: 'Delete a single depos record' })
  @ApiOkResponse({
    description: 'deletes a single depos based on the ID supplied',
  })
  @ApiForbiddenResponse({ description: 'Forbidden', type: Error })
  @ApiNotFoundResponse({ description: 'Not found', type: Error })
  @ApiDefaultResponse({ description: 'unexpected error', type: Error })
  delete(@Param('id') id: string): Promise<void> {
    return this.depoService.delete(id);
  }
}
