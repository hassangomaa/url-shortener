import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
  @ApiProperty({ type: Number, description: 'sequence number (6 digits)' })
  readonly id: number;

  @ApiProperty()
  readonly email: string;

  readonly password: string;

  @ApiProperty({ type: Date })
  readonly createdAt: Date;

  constructor(props: Partial<UserEntity>) {
    Object.assign(this, props);
  }
}
