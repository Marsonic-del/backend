const cards = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validUrl = require('../../controllers/validUrl');
const {
  getCards,
  createCard,
  deleteCard,
  putLike,
  removeLike,
} = require('../../controllers/cards');

/* const validUrl = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new Error('URL validation err');
}; */

cards.get('/', getCards);

cards.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validUrl),
  }),
}), createCard);
cards.delete('/:cardId', celebrate({
  // валидируем параметры
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), deleteCard);

cards.put('/:cardId/likes', celebrate({
  // валидируем параметры
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), putLike);
cards.delete('/:cardId/likes', celebrate({
  // валидируем параметры
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), removeLike);

module.exports = cards;
