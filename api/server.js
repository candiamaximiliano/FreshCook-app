const config = require("./app/config/index");
const server = require("./app/config/app.config");
const { conn } = require("./app/config/db.config");
const { initial } = require("./app/dbFill");

// Syncing all the models at once.
conn
  .sync({ force: true })
  .then(() => {
    server.listen(config.port, () => {
      console.log(`
    ################################################
          🛡️  Server listening on port: ${config.port} 🛡️
    ################################################`); // eslint-disable-line no-console
    });
  })
  .then(() => {
    initial();
  })
  .catch((error) => console.error(error));
