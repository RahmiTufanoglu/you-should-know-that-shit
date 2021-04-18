import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { User } from '../users/entities/user.entity';
import { Fact } from '../facts/entities/fact.entity';

const ormConfig: MysqlConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'rahmi123',
  database: 'truthy-vs-falsy-db',
  entities: [User, Fact],
  // do not use synchronize in production, use instead migrations
  synchronize: true,
  migrations: [],
};

export default ormConfig;
