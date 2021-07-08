const users = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getUserInfo,
} = require('../../controllers/users');

users.get('/', getUsers);

// возвращает информацию о текущем пользователе
users.get('/me', getUserInfo);

users.get('/:userId', celebrate({
  // валидируем параметры
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getUserById);

users.patch('/me', celebrate({
  // валидируем параметры
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);
users.patch('/me/avatar', celebrate({
  // валидируем параметры
  body: Joi.object().keys({
    avatar: Joi.string().required(),
  }),
}), updateAvatar);

module.exports = users;
