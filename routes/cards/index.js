const cards = require("express").Router();
const { getCards, createCard, deleteCard } = require("./cards");

cards.get("/", getCards);
cards.post("/", createCard);
cards.delete("/:cardId", deleteCard);

module.exports = cards;
