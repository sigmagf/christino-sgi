import { createConnection } from 'typeorm';

createConnection({
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
  migrations: [
    `${__dirname}/migrations/**/*.ts`,
    `${__dirname}/migrations/**/*.js`,
  ],
}).then(() => {
  console.log('Sucesso ao se conectar no banco de dados!');
});
