export default () => ({
  // port: parseInt(process.env.PORT, 10) || 3000,
  // database: {
  //   host: process.env.DATABASE_HOST,
  //   port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  // },
  connection: process.env.TYPEORM_CONNECTION,
  host: process.env.ConfigService,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  port: process.env.TYPEORM_PORT,
  synchronize: process.env.TYPEORM_SYNCHRONIZE,
  loggin: process.env.TYPEORM_LOGGING,
  entities: process.env.TYPEORM_ENTITIES,
});
