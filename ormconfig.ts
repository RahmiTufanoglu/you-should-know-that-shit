import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export const config = () => ({
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  database: dbConfig,
});

const dbConfig: MysqlConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'rahmi123',
  database: 'truthy-vs-falsy-db',
  synchronize: false,
  entities: [
    'dist/src/**/*.entity{.ts,.js}',
  ],
  migrations: [
    'dist/src/db/migrations/*.js',
  ],
  cli: {
    'migrationsDir': 'src/db/migrations',
  },
  migrationsRun: true,
};

export default dbConfig;
