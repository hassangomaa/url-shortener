// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { JwtService } from '@nestjs/jwt';
// import { JwtDecodedEntity } from '../entities';

// @Injectable()
// export class JwtServiceUtils {
//   constructor(
//     private readonly jwtService: JwtService,
//     private readonly configService: ConfigService,
//   ) {}

//   async generateTokens(payload: {
//     userId: string;
//     email: string;
//   }): Promise<{ accessToken: string; refreshToken: string }> {
//     const { userId, email } = payload;

//     const [accessToken, refreshToken] = await Promise.all([
//       this.jwtService.signAsync(
//         {
//           sub: userId,
//           email,
//         },
//         {
//           secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
//           expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRE'),
//         },
//       ),
//       this.jwtService.signAsync(
//         {
//           sub: userId,
//           email,
//         },
//         {
//           secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
//           expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRE'),
//         },
//       ),
//     ]);

//     return {
//       accessToken,
//       refreshToken,
//     };
//   }

//   async generateAccessToken(payload: {
//     userId: string;
//     email: string;
//   }): Promise<string> {
//     const { userId, email } = payload;

//     const accessToken = await this.jwtService.signAsync(
//       {
//         sub: userId,
//         email,
//       },
//       {
//         secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
//         expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRE'),
//       },
//     );

//     return accessToken;
//   }

//   async generateVerificationToken(payload: {
//     userId: string;
//   }): Promise<string> {
//     const { userId } = payload;

//     const verificationToken = await this.jwtService.signAsync(
//       {
//         sub: userId,
//       },
//       {
//         secret: this.configService.get<string>('JWT_VERIFICATION_TOKEN_SECRET'),
//         expiresIn: this.configService.get<string>(
//           'JWT_VERIFICATION_TOKEN_EXPIRE',
//         ),
//       },
//     );

//     return verificationToken;
//   }

//   verifyAccessToken(token: string): JwtDecodedEntity | null {
//     const decoded = this.jwtService.verify(token, {
//       secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
//     });

//     if (!decoded) return null;

//     return {
//       userId: decoded.sub,
//       email: decoded.email,
//     };
//   }

//   verifyRefreshToken(token: string): JwtDecodedEntity | null {
//     const decoded = this.jwtService.verify(token, {
//       secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
//     });

//     if (!decoded) return null;

//     return {
//       userId: decoded.sub,
//       email: decoded.email,
//     };
//   }

//   verifyVerificationToken(token: string): JwtDecodedEntity | null {
//     const decoded = this.jwtService.verify(token, {
//       secret: this.configService.get<string>('JWT_VERIFICATION_TOKEN_SECRET'),
//     });

//     if (!decoded) return null;

//     return {
//       userId: decoded.sub,
//       email: null,
//     };
//   }

//   decodeVerificationToken(token: string): JwtDecodedEntity | null {
//     const decoded = this.jwtService.decode(token);

//     if (!decoded) return null;

//     return {
//       userId: decoded.sub,
//       email: null,
//     };
//   }

//   // jitsi

//   async signJitsiPayload(payload: any): Promise<string> {
//     const signed = await this.jwtService.signAsync(payload, {
//       secret: this.configService.get<string>('JITSI_JWT_SECRET'),
//     });

//     return signed;
//   }
// }
