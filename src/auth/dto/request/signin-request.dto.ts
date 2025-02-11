import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SigninRequestDto {
  @ApiProperty({ description: 'User email', default: 'user@app.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password', default: '12345678' })
  @IsString()
  password: string;
}
