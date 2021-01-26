import { ConnectionOptions } from 'typeorm';

export const typeormConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT, 10),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: false,
  logging: false,
  entities: [
    `${__dirname}/../entities/**/*.ts`,
    `${__dirname}/../entities/**/*.js`,
  ],
};
