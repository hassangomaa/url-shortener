import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService {
  private pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  async query(query: string, params: any[] = []) {
    console.log('DATABASE_URL', process.env.DATABASE_URL);

    const { rows } = await this.pool.query(query, params);
    return rows;
  }
}
