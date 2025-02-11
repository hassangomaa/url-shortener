import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from './user.response.dto';

export class SigninResponseDto {
  @ApiProperty({ nullable: true })
  accessToken?: string;

  @ApiProperty({ nullable: true })
  refreshToken?: string;

  @ApiProperty({
    nullable: true,
    description:
      'Returns when user is signed up but not verified -> redirect user to verification code page',
  })
  verificationToken?: string;

  @ApiProperty({ type: UserResponseDto, nullable: true })
  user?: UserResponseDto;
}
