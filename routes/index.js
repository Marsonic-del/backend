const routes = require('express').Router();
const { NotFoundError } = require('../errors/NotFoundError');
const users = require('./users');
const cards = require('./cards');

routes.use('/users', users);
routes.use('/cards', cards);
routes.use('/', (req, res, next) => {
  next(new NotFoundError('Несуществующий маршрут'));
});

module.exports = routes;
