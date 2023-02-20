import { Sequelize } from "sequelize"

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'babar.db.elephantsql.com',
  port: 5432,
  database: 'qefpswbi',
  username: 'qefpswbi',
  password: 'LqANCfweT6oZbMbRIyv6TUgvLHDFSQrK',
  define: {
    underscored: true
  }
})