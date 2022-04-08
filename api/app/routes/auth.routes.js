const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const veryfySignUp = require("../middlewares/verifySignUp");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/api/auth/signup",
    [
      veryfySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );
  
  app.post("/api/auth/signin", controller.singin);

  app.post("/api/auth/refreshtoken", controller.refreshToken);
};