/* eslint-disable consistent-return */
const Card = require('../models/card');
const { handleDefualtError } = require('./errorHandlers');
const { ERR_400, ERR_404, errorMessages } = require('../utils/constants');

// Получаем все карточки
const getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch(() => handleDefualtError(req, res));
};

// Создание карточки
const createCard = (req, res) => {
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
        return res.status(ERR_400).send(errorMessages.cardsPost400);
      }
      return handleDefualtError(req, res);
    });
};

// Удаление карточки
const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(ERR_400).send(errorMessages.cardsDelete400);
      }
      res.send({ message: 'Карточка удалена' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERR_400).send(errorMessages.cardsDelete400);
      }
      return handleDefualtError(req, res);
    });
};

// Установка лайка
const putLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate('likes')
    .then((card) => {
      if (!card) {
        return res.status(ERR_404).send(errorMessages.cardsLikes400);
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERR_400).send(errorMessages.cardsLikes400);
      }
      return handleDefualtError(req, res);
    });
};

// Удаление лайка
const removeLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(ERR_404).send(errorMessages.cardsLikes400);
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERR_400).send(errorMessages.cardsLikes400);
      }
      return handleDefualtError(req, res);
    });
};

module.exports = {
  getCards, createCard, deleteCard, putLike, removeLike,
};
