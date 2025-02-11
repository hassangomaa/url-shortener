import { ApiProperty } from '@nestjs/swagger';

export class NotFoundResponse {
  @ApiProperty()
  type: string;

  @ApiProperty()
  message: string;
}
