import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private dbService: DatabaseService,
  ) {}

  async signup(email: string, password: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.dbService.query(
      'INSERT INTO users (email, password) VALUES ($1, $2)',
      [email, hashedPassword],
    );
  }

  async login(email: string, password: string) {
    const user = await this.dbService.query(
      'SELECT * FROM users WHERE email = $1',
      [email],
    );
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return {
      access_token: this.jwtService.sign({ sub: user.id, email: user.email }),
    };
  }
}
