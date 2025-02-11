import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class HashingService {
  constructor() {}

  async hash(str: string): Promise<string> {
    return await argon2.hash(str, {
      secret: Buffer.from(process.env.HASH_SECRET),
    });
  }

  async compare(hash: string, plain: string): Promise<boolean> {
    const match = await argon2.verify(hash, plain, {
      secret: Buffer.from(process.env.HASH_SECRET),
    });

    return match;
  }
}
