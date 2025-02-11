import { Type, plainToInstance } from 'class-transformer';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  validateSync,
} from 'class-validator';

class EnvironmentVariables {
  // General

  @IsString()
  NODE_ENV?: string;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  PORT?: number;

  // DATABASE

  @IsString()
  DATABASE_URL: string;

  // Logger

  @IsString()
  @IsOptional()
  LOG_LEVEL?: string;

  @IsString()
  @IsOptional()
  LOG_FORMAT?: string;

  // Swagger

  @IsString()
  SWAGGER_USER: string;

  @IsString()
  SWAGGER_PASSWORD: string;

  // Jwt

  //JWT_VERIFICATION_TOKEN_SECRET
  @IsString()
  JWT_VERIFICATION_TOKEN_SECRET?: string;

  // Hashing

  @IsString()
  HASH_SECRET: string;

  // Seed

  @IsString()
  @IsOptional()
  ADMIN_SEED_USERNAME?: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  ADMIN_SEED_EMAIL?: string;

  @IsString()
  @IsOptional()
  ADMIN_SEED_PASSWORD?: string;
}

export function validateEnv(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
