import { ApiProperty } from '@nestjs/swagger';

export class SignUpResponseDto {
  @ApiProperty({ description: 'A token used to verify the registration.' })
  verificationToken: string;
}
