import * as dotenv from 'dotenv';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

dotenv.config();

const {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_NAME,
} = process.env;

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: DATABASE_HOST,
  port: parseInt(DATABASE_PORT),
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  // development = ts , production = js
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  logging: true,
  migrationsTableName: 'migrations',
  migrations: [__dirname + '/migrations/**/*.{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export default config;
