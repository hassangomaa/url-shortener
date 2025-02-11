import { ResponseStatus } from '@app/lib/enums';
import { MessageResponseDto } from './message-response.dto';

export class ErrorResponseDto extends MessageResponseDto {
  constructor(message: string) {
    super(ResponseStatus.ERROR, message);
  }
}
