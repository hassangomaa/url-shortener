import { ApiProperty } from '@nestjs/swagger';

export class UrlStatsResponseDto {
  @ApiProperty({ description: 'Shortened URL' })
  shortUrl: string;

  @ApiProperty({ description: 'Total visits count' })
  visitCount: number;
}
