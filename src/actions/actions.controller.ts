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
import { FindAllQuery } from 'src/shared/find-query.dto';
import { FindQueryPipe } from 'src/shared/find-query.pipe';
import { ActionDto } from './action.dto';
import { ActionsService } from './actions.service';
import { CountDto } from '../shared/count.dto';

@ApiTags('Actions')
@Controller('actions')
export class ActionsController {
  constructor(private actionService: ActionsService) {}

  @Get()
  @ApiOperation({ description: "Find all the actions's records" })
  @ApiOkResponse({
    description: 'Retrieve containers document(s)',
    type: [ActionDto],
  })
  @ApiForbiddenResponse({ description: 'Forbidden', type: Error })
  @ApiNotFoundResponse({ description: 'Not found', type: Error })
  @ApiDefaultResponse({ description: 'unexpected error', type: Error })
  @UsePipes(new FindQueryPipe())
  all(@Query() query: FindAllQuery): Promise<ActionDto[]> {
    return this.actionService.findAllActions(query);
  }

  @Post()
  @ApiOperation({ description: 'Create a new actions record' })
  @ApiCreatedResponse({
    description: 'Retrieve action document(s)',
    type: ActionDto,
  })
  @ApiForbiddenResponse({ description: 'Forbidden', type: Error })
  @ApiNotFoundResponse({ description: 'Not found', type: Error })
  @ApiDefaultResponse({ description: 'unexpected error', type: Error })
  create(@Body() actionDto: ActionDto): Promise<ActionDto> {
    return this.actionService.create(actionDto);
  }

  @Get('/count')
  @ApiOperation({ description: 'Retrieve the number of actions documents' })
  @ApiOkResponse({
    description: 'Retrieve actions document(s)',
    type: CountDto,
  })
  @ApiForbiddenResponse({ description: 'Forbidden', type: Error })
  @ApiNotFoundResponse({ description: 'Not found', type: Error })
  @ApiDefaultResponse({ description: 'unexpected error', type: Error })
  actionCount(): Promise<CountDto> {
    return this.actionService.actionCount();
  }

  @Get(':id')
  @ApiOperation({ description: 'Find one action record' })
  @ApiOkResponse({
    description: 'Retrieve actions document(s)',
    type: ActionDto,
  })
  @ApiForbiddenResponse({ description: 'Forbidden', type: Error })
  @ApiNotFoundResponse({ description: 'Not found', type: Error })
  @ApiDefaultResponse({ description: 'unexpected error', type: Error })
  find(@Param('id') id: string): Promise<ActionDto> {
    return this.actionService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ description: 'Update a single actions record' })
  @ApiOkResponse({
    description: 'Retrieve actions document(s)',
    type: ActionDto,
  })
  @ApiForbiddenResponse({ description: 'Forbidden', type: Error })
  @ApiNotFoundResponse({ description: 'Not found', type: Error })
  @ApiDefaultResponse({ description: 'unexpected error', type: Error })
  update(
    @Param('id') id: string,
    @Body() actionDto: ActionDto,
  ): Promise<ActionDto> {
    return this.actionService.update(id, actionDto);
  }

  @Delete(':id')
  @ApiOperation({ description: 'Delete a single actions record' })
  @ApiOkResponse({
    description: 'deletes a single actions based on the ID supplied',
  })
  @ApiForbiddenResponse({ description: 'Forbidden', type: Error })
  @ApiNotFoundResponse({ description: 'Not found', type: Error })
  @ApiDefaultResponse({ description: 'unexpected error', type: Error })
  delete(@Param('id') id: string): Promise<void> {
    return this.actionService.delete(id);
  }
}
