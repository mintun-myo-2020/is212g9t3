require('dotenv').config('../.env')

// HOST = process.env.HOST
// USER = process.env.USER
// PASSWORD = process.env.PASSWORD

HOST = 'spmdb2.cnkc1tisp0k3.ap-southeast-1.rds.amazonaws.com'
USER = 'admin'
PASSWORD = 'adminadmin'

module.exports = {
  development: {
    HOST: HOST,
    USER: USER,
    PASSWORD: PASSWORD,
    DB: "SPMLJPS",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  test: {
    HOST: HOST,
    USER: USER,
    PASSWORD: PASSWORD,
    DB: "SPMLJPS_TEST",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
  };