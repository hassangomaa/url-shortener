import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UrlsService } from './urls.service';
import { ShortenedUrlResponseDto } from './dto/responses/shortened-url.response.dto';
import { ShortenUrlDto } from './dto/requests/shorten-url.dto';
import { UrlStatsResponseDto } from './dto/responses/url-stats.response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('URLs')
@Controller('urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @ApiOperation({
    summary: 'Shorten a URL',
    description: 'Shortens a long URL. Authentication required.',
  })
  @ApiResponse({ type: ShortenedUrlResponseDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('shorten')
  async shortenUrl(
    @Body() shortenUrlDto: ShortenUrlDto,
    @Request() req,
  ): Promise<ShortenedUrlResponseDto> {
    console.log('shortenUrlDto', shortenUrlDto);
    const urlEntity = await this.urlsService.shortenUrl(
      shortenUrlDto,
      req.user.userId,
    );
    return { originalUrl: urlEntity.originalUrl, shortUrl: urlEntity.shortUrl };
  }

  @ApiOperation({ summary: 'Redirect to original URL' })
  @ApiNotFoundResponse({ description: 'Short URL not found' })
  @Get(':shortUrl')
  async redirect(
    @Param('shortUrl') shortUrl: string,
    @Req() req, // Pass Request object
    @Res() res,
  ) {
    const originalUrl = await this.urlsService.getOriginalUrl(shortUrl, req);
    return res.redirect(originalUrl);
  }

  @ApiOperation({
    summary: 'Get URL statistics',
    description: 'Retrieve the visit count for a short URL.',
  })
  @ApiResponse({ type: UrlStatsResponseDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('stats/:shortUrl')
  async getUrlStats(
    @Param('shortUrl') shortUrl: string,
  ): Promise<UrlStatsResponseDto> {
    return this.urlsService.getUrlStats(shortUrl);
  }
}
