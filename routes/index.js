const routes = require("express").Router();
const users = require("./users");
const cards = require("./cards");

routes.use("/users", users);
routes.use("/cards", cards);

module.exports = routes;
