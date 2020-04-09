const express = require("express");
const dotenv = require("dotenv");
const Middleware = require("./middleware/middleware");
const PassportAuthMiddleware = require("./middleware/passport");
const ErrorHandlingMiddleware = require("./middleware/error-handler");

dotenv.config();

const app = express();

const port = process.env.PORT || "3000";
// view engine setup
app.set("view engine", "ejs");

const UserController = require("./controllers/user-controller");
const ClientController = require("./controllers/client-controller");
const FormController = require("./controllers/form-controller");
const CompanyController = require("./controllers/company-controller");
const StaticRoutes = require('./routes/static')

Middleware(app);

PassportAuthMiddleware(app);

// --> /user is the prefix
app.use("/user",StaticRoutes, UserController);
app.use("/client", ClientController);
app.use("/form", FormController);
app.use("/company", CompanyController);


ErrorHandlingMiddleware(app);


// app.use(StaticRoutes)

//testing default routes
app.get("/", (req, res) => {
  res.status(200).send("default");
});

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
