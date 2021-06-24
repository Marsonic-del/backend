const users = require("express").Router();
const { createUser, getUsers, getUserById, updateUser } = require("./users");

users.get("/", getUsers);
users.post("/", createUser);
users.get("/:userId", getUserById);
users.patch("/me", updateUser);
module.exports = users;
