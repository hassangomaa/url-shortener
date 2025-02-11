import { ApiProperty } from '@nestjs/swagger';

export class UrlEntity {
  @ApiProperty({ type: Number, description: 'Unique ID' })
  id: number;

  @ApiProperty({ type: String, description: 'Original long URL' })
  originalUrl: string;

  @ApiProperty({ type: String, description: 'Shortened URL identifier' })
  shortUrl: string;

  @ApiProperty({
    type: Number,
    description: 'User ID who created the short URL',
  })
  userId: number;

  @ApiProperty({
    type: Date,
    description: 'Timestamp when the URL was created',
  })
  createdAt: Date;

  constructor(props: Partial<UrlEntity>) {
    Object.assign(this, props);
  }
}
