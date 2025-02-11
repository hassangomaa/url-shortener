import { ApiProperty } from '@nestjs/swagger';

export class ShortenedUrlResponseDto {
  @ApiProperty({ description: 'Original long URL' })
  originalUrl: string;

  @ApiProperty({ description: 'Shortened URL identifier' })
  shortUrl: string;
}
