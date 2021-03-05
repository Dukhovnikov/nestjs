import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from '../shared/user.service';
import { LoggedInDto, SignInDto, SignUpDto } from './auth.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiDefaultResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtPayload } from './jwt.payload';
import { UserDto } from '../shared/user.dto';
import { Error } from '../shared/error.dto';

@ApiTags('UsersPermissions - User')
@Controller()
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('/auth/local')
  @ApiOperation({
    description: 'Login a user using the identifiers email and password',
  })
  @ApiCreatedResponse({
    description: 'Sign in has been successful',
    type: LoggedInDto,
  })
  @ApiForbiddenResponse({ description: 'Forbidden', type: Error })
  @ApiNotFoundResponse({ description: 'Not found', type: Error })
  @ApiDefaultResponse({ description: 'unexpected error', type: Error })
  async signIn(@Body() userDto: SignInDto): Promise<LoggedInDto> {
    const user = await this.userService.findByLogin(userDto);

    const jwtPayload: JwtPayload = {
      email: user.email,
    };

    const jwt = await this.authService.signIn(jwtPayload);
    return { user, jwt };
  }

  @Post('/auth/local/register')
  @ApiOperation({ description: 'Register a new user with the default role' })
  @ApiCreatedResponse({
    description: 'Sign up has been successful',
    type: UserDto,
  })
  @ApiForbiddenResponse({ description: 'Forbidden', type: Error })
  @ApiNotFoundResponse({ description: 'Not found', type: Error })
  @ApiBadRequestResponse({ description: 'Bad request', type: Error })
  @ApiDefaultResponse({ description: 'unexpected error', type: Error })
  signUp(@Body() userDto: SignUpDto): Promise<UserDto> {
    return this.userService.create(userDto);
  }

  @Get('/auth/:provider/callback')
  @ApiOperation({
    description: 'Successfully redirect after approving a provider',
  })
  @ApiOkResponse({ description: 'Request has been redirected' })
  @ApiForbiddenResponse({ description: 'Forbidden', type: Error })
  @ApiNotFoundResponse({ description: 'Not found', type: Error })
  @ApiDefaultResponse({ description: 'unexpected error', type: Error })
  authProvider(@Param('provider') provider: string): string {
    // TODO - finish implementation of AuthController.authProvider
    return 'TODO';
  }

  @Post('/auth/forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Send the reset password email link' })
  @ApiOkResponse({ description: 'Request has been sent' })
  @ApiForbiddenResponse({ description: 'Forbidden', type: Error })
  @ApiNotFoundResponse({ description: 'Not found', type: Error })
  @ApiDefaultResponse({ description: 'unexpected error', type: Error })
  forgotPassword(@Body() email: { email: string }): void {
    // TODO - finish implementation of AuthController.forgotPassword
  }

  @Post('/auth/reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Reset user password with a code (resetToken)' })
  @ApiOkResponse({ description: 'Request has been sent' })
  @ApiForbiddenResponse({ description: 'Forbidden', type: Error })
  @ApiNotFoundResponse({ description: 'Not found', type: Error })
  @ApiDefaultResponse({ description: 'unexpected error', type: Error })
  resetPassword(
    @Query('resetToken') resetToken: string,
    @Body() password: { password: string },
  ): void {
    // TODO - finish implementation of AuthController.resetPassword
  }

  @Get('/auth/email-confirmation')
  @ApiOperation({ description: 'Validate a user account' })
  @ApiOkResponse({ description: 'Request has been sent' })
  @ApiForbiddenResponse({ description: 'Forbidden', type: Error })
  @ApiNotFoundResponse({ description: 'Not found', type: Error })
  @ApiDefaultResponse({ description: 'unexpected error', type: Error })
  confirmEmail(): void {
    // TODO - finish implementation of AuthController.confirmEmail
  }

  @Post('/auth/send-email-confirmation')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: 'Send a confirmation email to user' })
  @ApiOkResponse({ description: 'Request has been sent' })
  @ApiForbiddenResponse({ description: 'Forbidden', type: Error })
  @ApiNotFoundResponse({ description: 'Not found', type: Error })
  @ApiDefaultResponse({ description: 'unexpected error', type: Error })
  sendEmailConfirmation(@Body() email: { email: string }): void {
    // TODO - finish implementation of AuthController.sendEmailConfirmation
  }
}
