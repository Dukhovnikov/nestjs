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
import { JwtGuard } from '../auth/jwt.guard';
import { Error } from '../shared/error.dto';
import { FindQueryPipe } from '../shared/find-query.pipe';
import { FindAllQuery } from '../shared/find-query.dto';
import { RolesService } from './roles.service';
import { CreateRolesDto, RolesDto, UpdateRolesDto } from './roles.dto';
import { CreateProfileDto, ProfileDto } from '../userprofile/userprofile.dto';

@ApiTags('UsersPermissions - Role')
@Controller('/users-permissions')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Get('roles')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOperation({ description: 'Find all the roles records' })
  @ApiOkResponse({
    description: 'Retrieve role document(s)',
    type: [RolesDto],
  })
  @ApiForbiddenResponse({ description: 'Forbidden', type: Error })
  @ApiNotFoundResponse({ description: 'Not found', type: Error })
  @ApiDefaultResponse({ description: 'unexpected error', type: Error })
  @UsePipes(new FindQueryPipe())
  find(@Query() query: FindAllQuery): Promise<RolesDto[]> {
    return this.rolesService.findAllRoles(query);
  }

  @Get('roles/:id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOkResponse({
    description: 'Retrieve role document(s)',
    type: RolesDto,
  })
  @ApiForbiddenResponse({ description: 'Forbidden', type: Error })
  @ApiNotFoundResponse({ description: 'Not found', type: Error })
  @ApiDefaultResponse({ description: 'unexpected error', type: Error })
  findOne(@Param('id') id: string): Promise<RolesDto> {
    return this.rolesService.findRole(id);
  }

  @Post('/roles')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOperation({ description: 'Create a new role record' })
  @ApiCreatedResponse({
    description: 'Retrieve role document(s)',
    type: RolesDto,
  })
  @ApiForbiddenResponse({ description: 'Forbidden', type: Error })
  @ApiNotFoundResponse({ description: 'Not found', type: Error })
  @ApiDefaultResponse({ description: 'unexpected error', type: Error })
  create(@Body() rolesDto: CreateRolesDto): Promise<RolesDto> {
    return this.rolesService.createRole(rolesDto);
  }

  @Put('roles/:id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOperation({ description: 'Update a single role record' })
  @ApiOkResponse({
    description: 'Retrieve role document(s)',
    type: RolesDto,
  })
  @ApiForbiddenResponse({ description: 'Forbidden', type: Error })
  @ApiNotFoundResponse({ description: 'Not found', type: Error })
  @ApiDefaultResponse({ description: 'unexpected error', type: Error })
  update(
    @Param('id') id: string,
    @Body() rolesDto: UpdateRolesDto,
  ): Promise<RolesDto> {
    return this.rolesService.updateRole(id, rolesDto);
  }

  @Delete('roles/:id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOperation({ description: 'Delete a single role record' })
  @ApiOkResponse({
    description: 'deletes a single role based on the ID',
  })
  @ApiForbiddenResponse({ description: 'Forbidden', type: Error })
  @ApiNotFoundResponse({ description: 'Not found', type: Error })
  @ApiDefaultResponse({ description: 'unexpected error', type: Error })
  delete(@Param('id') id: string): Promise<void> {
    return this.rolesService.deleteRole(id);
  }
}
