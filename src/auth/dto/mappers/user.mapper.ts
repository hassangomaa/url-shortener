import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities';
import { LanguageEnum } from '@app/lib/enums/language.enum';
import { UserResponseDto } from '../response';

@Injectable()
export class UserMapper {
  constructor() {}

  modelToEntity(model): UserEntity {
    return new UserEntity({
      id: model.id,

      email: model.email,

      password: model.password,

      createdAt: model.createdAt,
    });
  }

  entityToTranslatedResponseDto(
    entity: UserEntity,
    lang: LanguageEnum = LanguageEnum.en,
  ): UserResponseDto {
    const {
      password,

      ...rest
    } = entity;

    return {
      ...rest,
    };
  }
}
