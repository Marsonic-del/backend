const User = require("../models/user.js");
const { handleDefualtError } = require("./errorHandlers");
const {
  ERR_400,
  ERR_404,
  ERR_500,
  ID_LENGTH,
  errorMessages,
} = require("../utils/constants");

// Создание пользователя
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(ERR_400).send(errorMessages.usersPost400);
      }
      handleDefualtError(req, res);
    });
};

// Получение всех пользователей
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      handleDefualtError(req, res);
    });
};

// Получение пользователя по ID
const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(ERR_404).send(errorMessages.usersIdGet);
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(ERR_404).send(errorMessages.usersIdGet);
      }
      handleDefualtError(req, res);
    });
};

// Обновление даных пользователя
const updateUser = (req, res) => {
  if (req.user._id.length != ID_LENGTH) {
    return res.status(ERR_404).send(errorMessages.usersMePatch404);
  }
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true, upsert: false }
  )
    .then((user) => {
      if (!user) {
        return res.status(ERR_404).send(errorMessages.usersMePatch404);
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(ERR_400).send(errorMessages.usersMeAvatarPatch400);
      }
      handleDefualtError(req, res);
    });
};

// Обновление аватара пользователя
const updateAvatar = (req, res) => {
  if (req.user._id.length != ID_LENGTH) {
    return res.status(ERR_404).send(errorMessages.usersMeAvatarPatch404);
  }
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true, upsert: false }
  )
    .then((user) => {
      if (!user) {
        return res.status(ERR_404).send(errorMessages.usersMeAvatarPatch404);
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(ERR_400).send(errorMessages.usersMeAvatarPatch400);
      }
      handleDefualtError(req, res);
    });
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  updateAvatar,
};
