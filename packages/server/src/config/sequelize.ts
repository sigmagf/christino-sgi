import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
  },
});

export { sequelize };
