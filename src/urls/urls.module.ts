import { Module } from '@nestjs/common';

import { UrlMapper } from './mappers/url.mapper';
import { UrlsService } from './urls.service';
import { UrlsController } from './urls.controller';
import { DatabaseService } from '../database';

@Module({
  providers: [UrlsService, DatabaseService, UrlMapper],
  controllers: [UrlsController],
})
export class UrlsModule {}
