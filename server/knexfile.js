const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    },
    migrations: {
      directory: __dirname + "/db/migrations",
    },
    seeds: {
      directory: __dirname + "/db/seeds",
    },
  },
  // production: {
  //   client: "mysql",
  //   connection: process.env.DATABASE_URL,
  //   migrations:{
  //     directory:__dirname + '/db/migrations'
  //   },
  //   seeds:{
  //     directory:__dirname + '/db/seeds/production'
  //   }
  // },
};
