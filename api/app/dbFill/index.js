const { Role } = require("../config/db.config");
const ROLES = require("../config/roles.config");

function initial() {
  Role.create({
    id: 1,
    name: ROLES.User,
  });

  Role.create({
    id: 2,
    name: ROLES.Admin,
  });
}

module.exports = {
  initial,
};
