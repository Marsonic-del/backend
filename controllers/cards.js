const Card = require("../models/card.js");
const { handleDefualtError } = require("./errorHandlers");
const {
  ERR_400,
  ERR_404,
  ERR_500,
  ID_LENGTH,
  errorMessages,
} = require("../utils/constants");

// Получаем все карточки
const getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch((err) => handleDefualtError(req, res));
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
      if (err.name === "ValidationError") {
        return res.status(ERR_400).send(errorMessages.cardsPost400);
      }
      handleDefualtError(req, res);
    });
};

// Удаление карточки
const deleteCard = (req, res) => {
  if (req.params.cardId.length != ID_LENGTH) {
    return res.status(ERR_404).send(errorMessages.cardsDelete404);
  }
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(ERR_404).send(errorMessages.cardsDelete404);
      }
      res.send({ message: "Карточка удалена" });
    })
    .catch((err) => handleDefualtError(req, res));
};

// Установка лайка
const putLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .populate("likes")
    .then((card) => {
      if (!card) {
        return res.status(ERR_400).send(errorMessages.cardsLikes400);
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(ERR_400).send(errorMessages.cardsLikes400);
      }
      handleDefualtError(req, res);
    });
};

// Удаление лайка
const removeLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return res.status(ERR_400).send(errorMessages.cardsLikes400);
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(ERR_400).send(errorMessages.cardsLikes400);
      }
      handleDefualtError(req, res);
    });
};

module.exports = { getCards, createCard, deleteCard, putLike, removeLike };
