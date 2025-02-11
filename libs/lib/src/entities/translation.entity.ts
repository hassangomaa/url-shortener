import { LanguageEnum } from '../enums';

export class TranslationEntity {
  readonly translationId: number;
  readonly translable?: string;
  readonly lang: LanguageEnum;
  readonly column: string;
  readonly value: string;

  constructor(props: Partial<TranslationEntity>) {
    Object.assign(this, props);
  }
}
