import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
  @ApiProperty({ type: Number, description: 'User ID' })
  readonly id: number;

  @ApiProperty()
  readonly email: string;

  readonly password: string;

  @ApiProperty({ type: Date })
  readonly created_at: Date;

  constructor(props: Partial<UserEntity>) {
    Object.assign(this, props);
  }
}
