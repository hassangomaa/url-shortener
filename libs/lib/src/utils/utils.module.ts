import { Module, Global } from '@nestjs/common';
import { ArrayUtils } from './array.utils';
import { StringUtils } from './string.utils';
import { HashingService } from './hashing.service';
import { CustomJwtModule } from '../jwt';
import { DateUtils } from './date.utils';

@Global()
@Module({
  imports: [CustomJwtModule],
  exports: [ArrayUtils, StringUtils, DateUtils, HashingService],
  providers: [ArrayUtils, StringUtils, DateUtils, HashingService],
})
export class UtilsModule {}
