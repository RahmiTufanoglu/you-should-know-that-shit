// import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
// import { User } from './users/entities/user.entity';
// import { Fact } from './facts/entities/fact.entity';
// import { Claim } from './claims/entities/claim.entity';
// import { Category } from './categories/entities/category.entity';
//
// const ormConfig: MysqlConnectionOptions = {
//   type: 'mysql',
//   host: 'localhost',
//   // port: 3306,
//   // username: 'root',
//   // password: 'rahmi123',
//   port: parseInt(process.env.TYPEORM_PORT),
//   username: process.env.TYPEORM_USERNAME,
//   password: process.env.TYPEORM_PASSWORD,
//   database: 'truthy-vs-falsy-db',
//   entities: [User, Category, Fact, Claim],
//   // do not use synchronize in production, use instead migrations
//   synchronize: true,
//   migrations: [],
// };
//
// export default ormConfig;