const dotenv = require("dotenv");

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config(); // config() leerá su archivo .env, analizará el contenido, lo asignará a process.env.
if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = {
  backend: process.env.BACKEND,
  backend2: process.env.BACKEND2,
  port: process.env.PORT,
  databaseURL: process.env.DATABASE_URI,
  database: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
  },
  signature: process.env.SECRET,
  expiration: process.env.EXPIRATION_LOGIN,
  expirationRT: process.env.EXPIRATION_REFRESHTOKEN,
  algorithm: process.env.ALGORITHM,
  admin: process.env.ADMIN,
  user: process.env.USER,
  keyFoodApi: {
    firstKey: process.env.API_KEY_1,
    secondKey: process.env.API_KEY_2,
    thirdKey: process.env.API_KEY_3,
    fourthKey: process.env.API_KEY_4,
    fifthKey: process.env.API_KEY_5,
    sixthKey: process.env.API_KEY_6,
    seventhKey: process.env.API_KEY_7,
    eighthKey: process.env.API_KEY_8,
  },
};
