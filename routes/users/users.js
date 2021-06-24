const User = require("../../models/user.js");

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  console.log(name, about);
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true, upsert: false }
  )
    .then((user) => res.send({ data: user }))
    .catch((user) => res.send({ message: "Произошла ошибка" }));
};

module.exports = { createUser, getUsers, getUserById, updateUser };
