import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class ShortenUrlDto {
  @ApiProperty({ description: 'The long URL to be shortened' })
  @IsUrl()
  originalUrl: string;
}
