import { Injectable } from '@nestjs/common';
import { UrlEntity } from '../entities/url.entity';
import { ShortenedUrlResponseDto } from '../dto/responses/shortened-url.response.dto';

@Injectable()
export class UrlMapper {
  modelToEntity(model): UrlEntity {
    return new UrlEntity({
      id: model.id,
      originalUrl: model.original_url,
      shortUrl: model.short_url,
      userId: model.user_id,
      createdAt: model.created_at,
    });
  }

  entityToShortenedResponse(entity: UrlEntity): ShortenedUrlResponseDto {
    return {
      originalUrl: entity.originalUrl,
      shortUrl: entity.shortUrl,
    };
  }
}
