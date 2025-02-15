import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

import { UrlMapper } from './mappers/url.mapper';
import { UrlsService } from './urls.service';
import { UrlsController } from './urls.controller';

@Module({
  providers: [UrlsService, DatabaseService, UrlMapper],
  controllers: [UrlsController],
})
export class UrlsModule {}
