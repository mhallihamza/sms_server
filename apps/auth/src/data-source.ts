// apps/auth/src/data-source.ts
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { AuthUser } from './auth-user.entity';

// Load environment variables from .env file
dotenv.config({ path: './apps/auth/.env' });

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [AuthUser],
  migrations: [__dirname + '/migrations/*.ts'], // Directory for migration files
  synchronize: false, // Always false when using migrations
  logging: true, // Optional: helps with debugging
  migrationsRun: false,
  ssl: {
    rejectUnauthorized: false, // Allows insecure certificates (can be set to true if needed)
  },
  schema: 'public', // Set schema explicitly
});

export default AppDataSource;