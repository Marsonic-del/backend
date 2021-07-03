const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { handleDefualtError } = require('./errorHandlers');
const {
  ERR_400, ERR_404, ERR_401, SECRET_KEY, errorMessages,
} = require('../utils/constants');

// Создание пользователя
const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERR_400).send(errorMessages.usersPost400);
      }
      return handleDefualtError(req, res);
    });
};

// Получение всех пользователей
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => handleDefualtError(req, res));
};

// Получение пользователя по ID
const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(ERR_400).send(errorMessages.usersIdGet);
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERR_400).send(errorMessages.usersIdGet);
      }
      return handleDefualtError(req, res);
    });
};

// Обновление даных пользователя
const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true, upsert: false },
  )
    .then((user) => {
      if (!user) {
        return res.status(ERR_404).send(errorMessages.usersMePatch404);
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERR_400).send(errorMessages.usersMeAvatarPatch400);
      }
      if (err.name === 'CastError') {
        return res.status(ERR_400).send(errorMessages.usersMePatch400);
      }
      return handleDefualtError(req, res);
    });
};

// Обновление аватара пользователя
const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true, upsert: false },
  )
    .then((user) => {
      if (!user) {
        return res.status(ERR_404).send(errorMessages.usersMeAvatarPatch404);
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERR_400).send(errorMessages.usersMeAvatarPatch400);
      }
      if (err.name === 'CastError') {
        return res.status(ERR_400).send(errorMessages.usersMePatch400);
      }
      return handleDefualtError(req, res);
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => res.status(ERR_401).send(err.message));
};

const getUserInfo = (req, res) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => res.status(403).send(err.message));
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  updateAvatar,
  login,
  getUserInfo,
};
