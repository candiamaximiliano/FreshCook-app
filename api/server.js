const config = require('./app/config/index');
const server = require('./app/config/app.config');
const { conn } = require('./app/config/db.config');

const { Role } = require("./app/config/db.config");

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });

  Role.create({
    id: 2,
    name: "moderator"
  });

  Role.create({
    id: 3,
    name: "admin"
  });
}

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(config.port, () => {
    initial();
    console.log(`
    ################################################
          🛡️  Server listening on port: ${config.port} 🛡️
    ################################################`); // eslint-disable-line no-console
  });
});