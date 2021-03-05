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
import { UserprofileService } from './userprofile.service';
import { FindQueryPipe } from '../shared/find-query.pipe';
import { FindAllQuery } from '../shared/find-query.dto';
import { JwtGuard } from '../auth/jwt.guard';
import {
  CreateProfileDto,
  ProfileDto,
  WeChatCode,
  WeChatProfileDto,
} from './userprofile.dto';
import { CountDto } from '../shared/count.dto';

@ApiTags('UserProfile')
@Controller('userprofiles')
export class UserprofileController {
  constructor(private profileService: UserprofileService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOperation({ description: "Find all the userprofile's records" })
  @ApiOkResponse({
    description: 'Retrieve userprofile document(s)',
    type: [ProfileDto],
  })
  @ApiForbiddenResponse({ description: 'Forbidden', type: Error })
  @ApiNotFoundResponse({ description: 'Not found', type: Error })
  @ApiDefaultResponse({ description: 'unexpected error', type: Error })
  @UsePipes(new FindQueryPipe())
  find(@Query() query: FindAllQuery): Promise<ProfileDto[]> {
    return this.profileService.findAllUserProfiles(query);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOperation({ description: 'Create a new profile record' })
  @ApiCreatedResponse({
    description: 'Retrieve profile document(s)',
    type: ProfileDto,
  })
  @ApiForbiddenResponse({ description: 'Forbidden', type: Error })
  @ApiNotFoundResponse({ description: 'Not found', type: Error })
  @ApiDefaultResponse({ description: 'unexpected error', type: Error })
  create(@Body() profileDto: CreateProfileDto): Promise<ProfileDto> {
    return this.profileService.createProfile(profileDto);
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
    return this.profileService.countProfile();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOkResponse({
    description: 'Retrieve user profile document(s)',
    type: ProfileDto,
  })
  @ApiForbiddenResponse({ description: 'Forbidden', type: Error })
  @ApiNotFoundResponse({ description: 'Not found', type: Error })
  @ApiDefaultResponse({ description: 'unexpected error', type: Error })
  findOne(@Param('id') id: string): Promise<ProfileDto> {
    return this.profileService.findProfile(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOperation({ description: 'Update a single profile record' })
  @ApiOkResponse({
    description: 'Retrieve user profile document(s)',
    type: ProfileDto,
  })
  @ApiForbiddenResponse({ description: 'Forbidden', type: Error })
  @ApiNotFoundResponse({ description: 'Not found', type: Error })
  @ApiDefaultResponse({ description: 'unexpected error', type: Error })
  update(
    @Param('id') id: string,
    @Body() profileDto: CreateProfileDto,
  ): Promise<ProfileDto> {
    return this.profileService.updateProfile(id, profileDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOperation({ description: 'Delete a single profile record' })
  @ApiOkResponse({
    description: 'deletes a single profile based on the ID supplied',
  })
  @ApiForbiddenResponse({ description: 'Forbidden', type: Error })
  @ApiNotFoundResponse({ description: 'Not found', type: Error })
  @ApiDefaultResponse({ description: 'unexpected error', type: Error })
  delete(@Param('id') id: string): Promise<void> {
    return this.profileService.deleteProfile(id);
  }

  @Post('weauth')
  @ApiOperation({ description: 'Authenticate user via wechat' })
  @ApiOkResponse({
    description: 'Wechat response',
    type: WeChatProfileDto,
  })
  @ApiForbiddenResponse({ description: 'Forbidden', type: Error })
  @ApiNotFoundResponse({ description: 'Not found', type: Error })
  @ApiDefaultResponse({ description: 'unexpected error', type: Error })
  weauth(@Body() wechat: WeChatCode): Promise<WeChatProfileDto> {
    return this.profileService.wechatAuth(wechat.code);
  }
}
