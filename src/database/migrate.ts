//cmd: npx ts-node .\src\database\migrate.ts
import { config } from 'dotenv';
import * as bcrypt from 'bcrypt';

config();

import { DatabaseService } from './database.service';

async function migrate() {
  // console.log('Running database migration...');
  // console.log('DATABASE_URL:', process.env.DATABASE_URL);

  const db = new DatabaseService();
  // console.log('Dropping existing tables if they exist...');

  const dropTables = [
    `DROP TABLE IF EXISTS visits CASCADE;`,
    `DROP TABLE IF EXISTS urls CASCADE;`,
    `DROP TABLE IF EXISTS users CASCADE;`,
  ];

  for (const query of dropTables) {
    await db.query(query);
  }

  // console.log('Existing tables dropped. Recreating tables...');

  const createTables = [
    // Users Table
    `CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );`,

    // Index for quick lookup on email (common for authentication)
    `CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);`,

    // URLs Table
    `CREATE TABLE IF NOT EXISTS urls (
        id SERIAL PRIMARY KEY,
        original_url TEXT NOT NULL,
        short_url VARCHAR(10) UNIQUE NOT NULL,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );`,

    // Indexes for performance optimization
    `CREATE INDEX IF NOT EXISTS idx_urls_short_url ON urls(short_url);`,
    `CREATE INDEX IF NOT EXISTS idx_urls_user_id ON urls(user_id);`,

    // Visits Table
    `CREATE TABLE IF NOT EXISTS visits (
        id SERIAL PRIMARY KEY,
        url_id INTEGER REFERENCES urls(id) ON DELETE CASCADE,
        visited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        user_agent TEXT NOT NULL,
        ip_address INET NOT NULL
    );`,

    // Indexes for analytics and performance
    `CREATE INDEX IF NOT EXISTS idx_visits_url_id ON visits(url_id);`,
    `CREATE INDEX IF NOT EXISTS idx_visits_visited_at ON visits(visited_at);`,
    `CREATE INDEX IF NOT EXISTS idx_visits_ip_address ON visits(ip_address);`,
  ];

  for (const query of createTables) {
    await db.query(query);
  }

  // console.log('Database migration complete.');

  /// TODO: Add Seed Data
  // console.log('Seeding data...');
  const hashedPassword = await bcrypt.hash(process.env.USER_SEED_PASSWORD, 10);
  const email = process.env.USER_SEED_EMAIL;
  const now = new Date();
  await db.query(
    `INSERT INTO users (email, password, created_at) VALUES ($1, $2, $3);`,
    [email, hashedPassword, now],
  );

  // console.log('Data seeding complete.');

  process.exit();
}

migrate().catch((err) => {
  // console.error('Migration failed:', err);
  // process.exit(1);
});
