const express = require('express');
const { celebrate, Joi } = require('celebrate');

const cardRoute = express.Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

cardRoute.get('/', getCards);
cardRoute.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    // eslint-disable-next-line no-useless-escape
    link: Joi.string().required().regex(/https?:\/\/w{0,3}[\w\-\.~:/?#\[\]@!$&'\(\)*\+,;=]*\#?$/gmi),
  }),
}), createCard);
cardRoute.delete('/:cardId', deleteCard);
cardRoute.put('/:cardId/likes', likeCard);
cardRoute.delete('/:cardId/likes', dislikeCard);

module.exports = cardRoute;