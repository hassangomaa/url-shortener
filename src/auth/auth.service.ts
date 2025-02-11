import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/database.service';
import { SigninRequestDto, SigninResponseDto, SignupRequestDto } from './dto';
import { UserMapper } from './dto/mappers';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly dbService: DatabaseService,
    private readonly jwtService: JwtService,
    private readonly userMapper: UserMapper,
    private readonly configService: ConfigService,
  ) {
    console.log('JWT_SECRET:', this.configService.get<string>('JWT_SECRET')); // Debugging
  }

  /**
   * User Signup - Creates a new user and returns tokens
   */
  async signup(payload: SignupRequestDto): Promise<SigninResponseDto> {
    const { email, password } = payload;
    const now = new Date();

    // Check if email already exists
    const existingUser = await this.dbService.query(
      'SELECT id FROM users WHERE email = $1',
      [email],
    );

    if (existingUser.length > 0) {
      throw new BadRequestException('This email is already registered.');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user
    const result = await this.dbService.query(
      `INSERT INTO users (email, password, created_at)
       VALUES ($1, $2, $3) RETURNING id, email, password, created_at`,
      [email, hashedPassword, now],
    );

    const user = this.userMapper.modelToEntity(result[0]);
    console.log('user', user);

    // Generate JWT tokens
    const accessToken = this.jwtService.sign({
      userId: user.id,
      email: user.email,
    });
    const refreshToken = this.jwtService.sign(
      { userId: user.id },
      { expiresIn: '7d' },
    );

    return { accessToken, refreshToken, user };
  }

  /**
   * User Signin - Authenticate a user and return tokens
   */
  async signin(payload: SigninRequestDto): Promise<SigninResponseDto> {
    const { email, password } = payload;

    // Fetch user from database
    const userResult = await this.dbService.query(
      'SELECT id, email, password, created_at FROM users WHERE email = $1',
      [email],
    );

    if (userResult.length === 0) {
      throw new NotFoundException('Wrong credentials.');
    }

    const user = this.userMapper.modelToEntity(userResult[0]);
    console.log('user', user);

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Wrong credentials.');
    }

    // Generate JWT tokens
    const accessToken = this.jwtService.sign({
      userId: user.id,
      email: user.email,
    });
    const refreshToken = this.jwtService.sign(
      { userId: user.id },
      { expiresIn: '7d' },
    );

    return { accessToken, refreshToken, user };
  }
}
