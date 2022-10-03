require('dotenv').config('../.env')

HOST = process.env.HOST
USER = process.env.USER
PASSWORD = process.env.PASSWORD

module.exports = {
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
  };