/* eslint-disable consistent-return */
const Card = require('../models/card');
const { NotFoundError } = require('../errors/NotFoundError');
const { NotValidDataError } = require('../errors/NotValidDataError');
const { DefaultServerError } = require('../errors/DefaultServerError');
const { ForbiddenError } = require('../errors/ForbiddenError');
const { errorMessages } = require('../utils/constants');

// Получаем все карточки
const getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch(() => { throw new DefaultServerError(errorMessages.defaultMessage500); })
    .catch(next);
};

// Создание карточки
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({
    name,
    link,
    owner: req.user._id,
    likes: [],
    createdAt: Date.now(),
  })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new NotValidDataError(errorMessages.cardsPost400);
      }
      throw new DefaultServerError(errorMessages.defaultMessage500);
    })
    .catch(next);
};

// Удаление карточки
const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        return next(new NotFoundError(errorMessages.cardsDelete400));
      }
      if (JSON.stringify(card.owner) !== JSON.stringify(req.user._id)) {
        return next(new ForbiddenError(errorMessages.cardsDelete403));
      }
      Card.findByIdAndRemove(card._id)
        .then(() => {
          res.send({ message: 'Карточка удалена' });
        })
        .catch(() => {
          throw new DefaultServerError(errorMessages.defaultMessage500);
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new NotValidDataError(errorMessages.cardsDelete400);
      }
      throw new DefaultServerError(errorMessages.defaultMessage500);
    })
    .catch(next);
};

// Установка лайка
const putLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate('likes')
    .then((card) => {
      if (!card) {
        return next(new NotFoundError(errorMessages.cardsLikes400));
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new NotValidDataError(errorMessages.cardsLikes400);
      }
      throw new DefaultServerError(errorMessages.defaultMessage500);
    })
    .catch(next);
};

// Удаление лайка
const removeLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(new NotFoundError(errorMessages.cardsLikes400));
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new NotValidDataError(errorMessages.cardsLikes400);
      }
      throw new DefaultServerError(errorMessages.defaultMessage500);
    })
    .catch(next);
};

module.exports = {
  getCards, createCard, deleteCard, putLike, removeLike,
};
