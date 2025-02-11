import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SigninRequestDto {
  @ApiProperty({
    description: 'personal email',
    default: 'user@app.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'password', default: '12345678' })
  @IsString()
  password: string;
}
