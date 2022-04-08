module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "Lomocompleto1",
  DB: "freshfoodapp",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}