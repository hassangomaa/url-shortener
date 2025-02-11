import { Injectable } from '@nestjs/common';
import { createHash, randomUUID } from 'crypto';

@Injectable()
export class StringUtils {
  getFileExtension = (fileName: string) => {
    return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length);
  };

  getFileNameFromUrl = (url: string) => {
    const fileName = url.substring(url.lastIndexOf('/') + 1, url.length);
    return fileName;
  };

  getFilePathAndNameFromUrl = (
    urlPath: string,
  ): { path: string; fileName: string } => {
    const path = urlPath.substring(0, urlPath.lastIndexOf('/'));
    const fileName = urlPath.substring(
      urlPath.lastIndexOf('/') + 1,
      urlPath.length,
    );

    return { path, fileName };
  };

  createUrlFromPath = (path?: string): string | null => {
    if (!path) return null;

    if (path.startsWith('https://')) return path;

    return `${process.env.BUNNY_PUBLIC_CDN_URL}/${process.env.BUNNY_PUBLIC_PREFIX}/${path}`;
  };

  generateRandomNumericCode = (length: number): string => {
    const NUMBERS = '0123456789';

    let result = '';

    for (let i = 0; i < length; i++) {
      result += NUMBERS.charAt(Math.floor(Math.random() * NUMBERS.length));
    }

    if (result.length < length) {
      result = result.padEnd(length, '0');
    }

    // in dev env return 1111

    return (process.env.NODE_ENV ?? 'development') === 'development'
      ? new String('1').repeat(length)
      : result;
  };

  transformToTsQuerySearchTerm = (searchTerm: string): string => {
    // for to_tsquery() full text search feature in postgres
    // example: "good vibes" => "good & vibes"
    return searchTerm.trim().replace(/\s+/g, ' & ');
  };

  replaceSpacesWithUnderscore = (str: string): string => {
    return str.trim().replace(/ +/g, '_');
  };

  hashUUID = (uuid: string, length = 22): string => {
    // Function to hash a UUID and produce a shorter output
    const hash = createHash('sha256')
      .update(uuid, 'binary')
      .digest('base64')
      .replace(/[^a-zA-Z0-9]/g, 'a');

    return hash.substring(0, length); // Truncate the hashed value to the desired length
  };

  generateUUID(): string {
    return randomUUID();
  }

  generateRandomNumbersBetweenRange(
    min: number,
    max: number,
    length: number,
  ): number[] {
    // find diff
    const difference = max - min;

    const results: number[] = [];

    for (let i = 0; i < length; i++) {
      // generate random number
      let rand = Math.random();

      // multiply with difference
      rand = Math.floor(rand * difference);

      // add with min value
      rand = rand + min;

      results.push(rand);
    }

    return [...new Set(results)];
  }

  removeTZfromDate(date: Date): string {
    // yyyy-mm-dd
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  generatePassword(length: number): string {
    let pass = '';
    const str =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz0123456789@#$';

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    return pass;
  }
}
