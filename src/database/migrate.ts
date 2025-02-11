import { config } from 'dotenv';
config();

import { DatabaseService } from './database.service';

async function migrate() {
  console.log('Running database migration...');
  console.log('DATABASE_URL:', process.env.DATABASE_URL);

  const db = new DatabaseService();
  console.log('database migration...');

  const queries = [
    `CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
    );`,
  ];

  for (const query of queries) {
    await db.query(query);
  }

  console.log('Database migration complete.');
  process.exit();
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
