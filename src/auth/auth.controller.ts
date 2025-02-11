import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SigninRequestDto, SigninResponseDto, SignupRequestDto } from './dto';

@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
@ApiNotAcceptableResponse({ description: 'Invalid Data Provided' })
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * @description Register a new user and return authentication tokens
   */
  @ApiOperation({
    summary: 'Register a new user',
    description:
      'Creates a new user, retrieves user data, and returns JWT tokens.',
  })
  @ApiResponse({ type: SigninResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid Input Data' })
  @Post('sign-up')
  async signup(
    @Body() signupDto: SignupRequestDto,
  ): Promise<SigninResponseDto> {
    console.log('signupDto', signupDto);
    return this.authService.signup(signupDto);
  }

  /**
   * @description Authenticate user and return access & refresh tokens
   */
  @ApiOperation({
    summary: 'User Signin',
    description: 'Authenticate a user and return JWT tokens.',
  })
  @ApiResponse({ type: SigninResponseDto })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @Post('sign-in')
  async signin(
    @Body() signinDto: SigninRequestDto,
  ): Promise<SigninResponseDto> {
    console.log('signinDto', signinDto);
    return this.authService.signin(signinDto);
  }
}
