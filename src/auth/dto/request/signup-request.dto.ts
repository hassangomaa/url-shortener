import { IsEmail, IsString, Matches, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupStudentDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description:
      'Password must include at least one number and one special character, min length is (8)',
  })
  @IsString()
  @MinLength(8)
  @Matches(/(?=.*[0-9])(?=.*[!@#$%^&*])/, {
    message:
      'Password must include at least one number and one special character.',
  })
  password: string;
}
