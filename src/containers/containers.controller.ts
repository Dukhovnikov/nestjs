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
import { ContainersService } from './containers.service';
import { ContainerDto } from './container.dto';
import {
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
import { FindAllQuery } from '../shared/find-query.dto';
import { CountDto } from '../shared/count.dto';

@ApiTags('Containers')
@Controller('containers')
export class ContainersController {
  constructor(private containersService: ContainersService) {}

  @Get()
  @ApiOperation({ description: "Find all the containers's records" })
  @ApiOkResponse({
    description: 'Retrieve containers document(s)',
    type: [ContainerDto],
  })
  @ApiForbiddenResponse({ description: 'Forbidden', type: Error })
  @ApiNotFoundResponse({ description: 'Not found', type: Error })
  @ApiDefaultResponse({ description: 'unexpected error', type: Error })
  @UsePipes(new FindQueryPipe())
  all(@Query() query: FindAllQuery): Promise<ContainerDto[]> {
    return this.containersService.findAllContainers(query);
  }

  @Post()
  @ApiOperation({ description: 'Create a new containers record' })
  @ApiCreatedResponse({
    description: 'Retrieve containers document(s)',
    type: ContainerDto,
  })
  @ApiForbiddenResponse({ description: 'Forbidden', type: Error })
  @ApiNotFoundResponse({ description: 'Not found', type: Error })
  @ApiDefaultResponse({ description: 'unexpected error', type: Error })
  create(@Body() containerDto: ContainerDto): Promise<ContainerDto> {
    return this.containersService.create(containerDto);
  }

  @Get('/check/:container')
  @ApiOkResponse({
    description: 'Retrieve containers document(s)',
    type: ContainerDto,
  })
  @ApiForbiddenResponse({ description: 'Forbidden', type: Error })
  @ApiNotFoundResponse({ description: 'Not found', type: Error })
  @ApiDefaultResponse({ description: 'unexpected error', type: Error })
  findContainer(@Param('container') container: string): Promise<ContainerDto> {
    return this.containersService.findContainer(container);
  }

  @Get('/count')
  @ApiOperation({ description: 'Retrieve the number of containers documents' })
  @ApiOkResponse({
    description: 'Retrieve containers document(s)',
    type: CountDto,
  })
  @ApiForbiddenResponse({ description: 'Forbidden', type: Error })
  @ApiNotFoundResponse({ description: 'Not found', type: Error })
  @ApiDefaultResponse({ description: 'unexpected error', type: Error })
  containerCount(): Promise<CountDto> {
    return this.containersService.containerCount();
  }

  @Get(':id')
  @ApiOperation({ description: 'Find one containers record' })
  @ApiOkResponse({
    description: 'Retrieve containers document(s)',
    type: ContainerDto,
  })
  @ApiForbiddenResponse({ description: 'Forbidden', type: Error })
  @ApiNotFoundResponse({ description: 'Not found', type: Error })
  @ApiDefaultResponse({ description: 'unexpected error', type: Error })
  find(@Param('id') id: string): Promise<ContainerDto> {
    return this.containersService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ description: 'Update a single containers record' })
  @ApiOkResponse({
    description: 'Retrieve containers document(s)',
    type: ContainerDto,
  })
  @ApiForbiddenResponse({ description: 'Forbidden', type: Error })
  @ApiNotFoundResponse({ description: 'Not found', type: Error })
  @ApiDefaultResponse({ description: 'unexpected error', type: Error })
  update(
    @Param('id') id: string,
    @Body() containerDto: ContainerDto,
  ): Promise<ContainerDto> {
    return this.containersService.update(id, containerDto);
  }

  @Delete(':id')
  @ApiOperation({ description: 'Delete a single containers record' })
  @ApiOkResponse({
    description: 'deletes a single containers based on the ID supplied',
  })
  @ApiForbiddenResponse({ description: 'Forbidden', type: Error })
  @ApiNotFoundResponse({ description: 'Not found', type: Error })
  @ApiDefaultResponse({ description: 'unexpected error', type: Error })
  delete(@Param('id') id: string): Promise<void> {
    return this.containersService.delete(id);
  }
}
