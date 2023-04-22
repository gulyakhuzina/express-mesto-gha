const express = require('express');

const cardRoute = express.Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

cardRoute.get('/cards', getCards);
cardRoute.post('/cards', createCard);
cardRoute.delete('/cards/:cardId', deleteCard);
cardRoute.put('/cards/:cardId/likes', likeCard);
cardRoute.delete('/cards/:cardId/likes', dislikeCard);

module.exports = cardRoute;