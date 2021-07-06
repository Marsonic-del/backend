const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { NotFoundError } = require('../errors/NotFoundError');
const { NotValidDataError } = require('../errors/NotValidDataError');
const { ExistedEmailError } = require('../errors/ExistedEmailError');
const { DefaultServerError } = require('../errors/DefaultServerError');
const {
  SECRET_KEY, errorMessages,
} = require('../utils/constants');

// Создание пользователя
const createUser = (req, res, next) => {
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
        throw new NotValidDataError(errorMessages.usersPost400);
      }
      if (err.name === 'MongoError' && err.code === 11000) {
        throw new ExistedEmailError(errorMessages.notValidEmail409);
      }
      throw new DefaultServerError(errorMessages.defaultMessage500);
    })
    .catch(next);
};

// Получение всех пользователей
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => { throw new DefaultServerError(errorMessages.defaultMessage500); })
    .catch(next);
};

// Получение пользователя по ID
const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        next(new NotValidDataError(errorMessages.usersIdGet));
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new NotValidDataError(errorMessages.usersIdGet);
      }
      throw new DefaultServerError(errorMessages.defaultMessage500);
    })
    .catch(next);
};

// Обновление даных пользователя
const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true, upsert: false },
  )
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Нет пользователя с таким id'));
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        throw new NotValidDataError(errorMessages.usersMePatch400);
      }
      throw new DefaultServerError(errorMessages.defaultMessage500);
    })
    .catch(next);
};

// Обновление аватара пользователя
const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true, upsert: false },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(errorMessages.usersMeAvatarPatch404);
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new NotValidDataError(errorMessages.usersMeAvatarPatch400);
      }
      if (err.name === 'CastError') {
        throw new NotValidDataError(errorMessages.usersMePatch400);
      }
      throw new DefaultServerError(errorMessages.defaultMessage500);
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      res.send({ data: user });
    })
    .catch(() => { throw new DefaultServerError(errorMessages.defaultMessage500); })
    .catch(next);
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
