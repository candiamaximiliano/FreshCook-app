const express = require("express");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const auth = require("../routes/auth.routes");
const recipes = require("../routes/recipes.routes");
const recipe = require("../routes/recipe.routes");
const types = require("../routes/types.routes");
const upload = require("../routes/upload.routes");
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

require("./db.config");

const server = express();

Sentry.init({
  dsn: "https://6f5b4f6a47cf4aa29a8d48e26223737c@o1263884.ingest.sentry.io/6445988",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ server }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

server.name = "API";

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
server.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
server.use(Sentry.Handlers.tracingHandler());
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use(cors());
server.use(fileUpload());
server.use(express.static("assets"));

//simple route
server.get("/", (req, res) => {
  res.json({ message: "Welcome to Fresh Cook App API." });
});

// routes
server.use("/auth", auth);
server.use("/recipes", recipes);
server.use("/recipe", recipe);
server.use("/types", types);
server.use("/upload", upload);

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Access-Token"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE, PATCH"
  );
  next();
});

// The error handler must be before any other error middleware and after all controllers
server.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
server.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
