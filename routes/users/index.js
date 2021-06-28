const users = require('express').Router();

const {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  updateAvatar,
} = require('../../controllers/users');

users.get('/', getUsers);
users.post('/', createUser);
users.get('/:userId', getUserById);
users.patch('/me', updateUser);
users.patch('/me/avatar', updateAvatar);

module.exports = users;
