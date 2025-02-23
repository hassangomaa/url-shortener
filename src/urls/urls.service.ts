import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as crypto from 'crypto';

import { UrlMapper } from './mappers/url.mapper';
import { ShortenUrlDto } from './dto/requests/shorten-url.dto';
import { UrlEntity } from './entities/url.entity';
import { DatabaseService } from '../database';

@Injectable()
export class UrlsService {
  constructor(
    private readonly db: DatabaseService,
    private readonly urlMapper: UrlMapper,
  ) {}

  async shortenUrl(payload: ShortenUrlDto, userId: number): Promise<UrlEntity> {
    const shortUrl = crypto.randomBytes(5).toString('hex');

    const result = await this.db.query(
      `INSERT INTO urls (original_url, short_url, user_id, created_at) 
       VALUES ($1, $2, $3, NOW()) RETURNING *`,
      [payload.originalUrl, shortUrl, userId],
    );

    return this.urlMapper.modelToEntity(result[0]);
  }

  async getOriginalUrl(shortUrl: string, req): Promise<string> {
    // Fetch URL details (including ID)
    const result = await this.db.query(
      'SELECT id, original_url FROM urls WHERE short_url = $1',
      [shortUrl],
    );

    if (result.length === 0) {
      throw new NotFoundException('Short URL not found');
    }

    const urlId = result[0].id;
    const originalUrl = result[0].original_url;

    // Track visit in `visits` table
    await this.db.query(
      `INSERT INTO visits (url_id, visited_at, user_agent, ip_address)
     VALUES ($1, NOW(), $2, $3)`,
      [urlId, req.headers['user-agent'] || 'unknown', req.ip || '0.0.0.0'],
    );

    return originalUrl;
  }

  async getUrlStats(
    shortUrl: string,
  ): Promise<{ shortUrl: string; visitCount: number }> {
    const result = await this.db.query(
      `SELECT COUNT(*) AS visit_count FROM visits 
       INNER JOIN urls ON visits.url_id = urls.id 
       WHERE urls.short_url = $1`,
      [shortUrl],
    );

    return {
      shortUrl,
      visitCount: parseInt(result[0].visit_count, 10),
    };
  }
}
