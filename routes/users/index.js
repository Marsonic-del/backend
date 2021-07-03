const users = require('express').Router();

const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getUserInfo,
} = require('../../controllers/users');

users.use('/', require('../../middlewares/auth'));

users.get('/', getUsers);
// возвращает информацию о текущем пользователе
users.get('/me', getUserInfo);

users.get('/:userId', getUserById);
users.patch('/me', updateUser);
users.patch('/me/avatar', updateAvatar);

module.exports = users;
