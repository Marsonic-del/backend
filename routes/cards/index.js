const cards = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  putLike,
  removeLike,
} = require('../../controllers/cards');

cards.get('/', getCards);
cards.post('/', createCard);
cards.delete('/:cardId', deleteCard);
cards.put('/:cardId/likes', putLike);
cards.delete('/:cardId/likes', removeLike);

module.exports = cards;
