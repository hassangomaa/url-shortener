import { ApiProperty } from '@nestjs/swagger';

export class TranslateFieldEntity {
  @ApiProperty()
  ar: string;

  @ApiProperty({ nullable: true })
  en?: string;

  @ApiProperty({ nullable: true })
  fr?: string;

  @ApiProperty({ nullable: true })
  es?: string;
}
