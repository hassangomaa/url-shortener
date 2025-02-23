import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }

  async query(query: string, params?: any[]) {
    // console.log('DATABASE_URL', process.env.DATABASE_URL);
    const { rows } = await this.pool.query(query, params);
    return rows;
  }

  async close() {
    // console.log('Closing database connection...');
    await this.pool.end(); // Ensure connection is properly closed
  }

  async onModuleDestroy() {
    await this.close();
  }
}
