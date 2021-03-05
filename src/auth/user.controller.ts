import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UserService } from '../shared/user.service';
import {
  ApiBearerAuth,
  ApiDefaultResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UpdateUserDto, UserDto } from '../shared/user.dto';
import { Error } from '../shared/error.dto';
import { FindQueryPipe } from '../shared/find-query.pipe';
import { FindAllQuery } from '../shared/find-query.dto';
import { GetUser } from '../shared/user.decorator';
import { JwtGuard } from './jwt.guard';

@ApiTags('UsersPermissions - User')
@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/users')
  @ApiOperation({ description: 'Retrieve all user documents' })
  @ApiOkResponse({
    description: 'Retrieve users document(s)',
    type: [UserDto],
  })
  @ApiForbiddenResponse({ description: 'Forbidden', type: Error })
  @ApiNotFoundResponse({ description: 'Not found', type: Error })
  @ApiDefaultResponse({ description: 'unexpected error', type: Error })
  @UsePipes(new FindQueryPipe())
  all(@Query() query: FindAllQuery): Promise<UserDto[]> {
    return this.userService.findAllUsers(query);
  }

  @Get('/users/me')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOperation({ description: 'Retrieve the logged in user information' })
  @ApiOkResponse({
    description: 'Retrieve user document(s)',
    type: UserDto,
  })
  @ApiForbiddenResponse({ description: 'Forbidden', type: Error })
  @ApiNotFoundResponse({ description: 'Not found', type: Error })
  @ApiDefaultResponse({ description: 'unexpected error', type: Error })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  me(@GetUser() user: UserDto): UserDto {
    return user;
  }

  @Get('/users/:id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOperation({ description: 'Retrieve a single user depending on his id' })
  @ApiOkResponse({
    description: 'Retrieve user document(s)',
    type: UserDto,
  })
  @ApiForbiddenResponse({ description: 'Forbidden', type: Error })
  @ApiNotFoundResponse({ description: 'Not found', type: Error })
  @ApiDefaultResponse({ description: 'unexpected error', type: Error })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  findUser(@Param('id') id: string): Promise<UserDto> {
    return this.userService.findOne(id);
  }

  @Put('/users/:id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOperation({ description: 'Update an existing user' })
  @ApiOkResponse({
    description: 'Retrieve user document(s)',
    type: UserDto,
  })
  @ApiForbiddenResponse({ description: 'Forbidden', type: Error })
  @ApiNotFoundResponse({ description: 'Not found', type: Error })
  @ApiDefaultResponse({ description: 'unexpected error', type: Error })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async updateUser(
    @Param('id') id: string,
    @Body() userDto: UpdateUserDto,
  ): Promise<UserDto> {
    return await this.userService.updateUser(id, userDto);
  }

  @Delete('/users/:id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOperation({ description: 'Delete an existing user' })
  @ApiOkResponse({
    description: 'deletes a single user based on the ID supplied',
  })
  @ApiForbiddenResponse({ description: 'Forbidden', type: Error })
  @ApiNotFoundResponse({ description: 'Not found', type: Error })
  @ApiDefaultResponse({ description: 'unexpected error', type: Error })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async delete(@Param('id') id: string): Promise<void> {
    return await this.userService.deleteUser(id);
  }
}
