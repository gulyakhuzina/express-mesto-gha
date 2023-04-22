const Card = require('../models/card');
const handleErrors = require('./handleErrors');

const setLikes = (req, res, setFunction) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    setFunction,
    { new: true },
  )
    .orFail()
    .populate(['owner', 'likes'])
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      handleErrors(err, res);
    });
};

const getCards = (req, res) => {
  Card.find()
    .populate(['owner', 'likes'])
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch((err) => {
      handleErrors(err, res);
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => card.populate(['owner', 'likes']))
    .then((card) => {
      res.status(201).send({ data: card });
    })
    .catch((err) => {
      handleErrors(err, res);
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .orFail()
    .populate(['owner', 'likes'])
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      handleErrors(err, res);
    });
};

const likeCard = (req, res) => {
  setLikes(req, res, { $addToSet: { likes: req.user._id } });
};

const dislikeCard = (req, res) => {
  setLikes(req, res, { $pull: { likes: req.user._id } });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
