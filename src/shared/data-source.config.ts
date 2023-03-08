import { DataSource } from 'typeorm';
import { config } from 'dotenv';
config();
export default new DataSource({
  type: 'postgres',
  replication: {
    master: {
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    },
    slaves: [
      {
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
      },
    ],
  },
  entities: [__dirname + '/../models/**/entities/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../databases/migrations/*{.ts,.js}'],
  synchronize: false,
});
