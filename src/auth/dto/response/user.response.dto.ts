import { ApiProperty, OmitType } from '@nestjs/swagger';
import { UserEntity } from '../entities';

export class UserResponseDto extends OmitType(UserEntity, [
  'password',
] as const) {}
