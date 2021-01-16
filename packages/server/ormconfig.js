module.exports = {
   type: 'postgres',
   host: process.env.TYPEORM_HOST,
   port: parseInt(process.env.TYPEORM_PORT, 10),
   username: process.env.TYPEORM_USERNAME,
   password: process.env.TYPEORM_PASSWORD,
   database: process.env.TYPEORM_DATABASE,
   synchronize: false,
   logging: false,
   entities: [
      "src/entities/**/*.ts",
      "dist/entities/**/*.js"
   ],
   migrations: [
      "src/database/migrations/**/*.ts",
      "dist/database/migrations/**/*.js"
   ],
   cli: {
      "entitiesDir": "src/entities",
      "migrationsDir": "src/database/migrations"
   }
 }