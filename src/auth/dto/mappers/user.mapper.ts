import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { UserResponseDto } from '../response';

@Injectable()
export class UserMapper {
  constructor() {}

  modelToEntity(model): UserEntity {
    return new UserEntity({
      id: model.id,
      email: model.email,
      password: model.password,
      created_at: model.created_at,
    });
  }

  entityToResponseDto(entity: UserEntity): UserResponseDto {
    const { password, ...rest } = entity;
    return rest;
  }
}
