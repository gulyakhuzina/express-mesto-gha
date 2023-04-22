const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле name обязательное'],
    minlength: [2, 'Минимальное количество символов поля name: 2'],
    maxlength: [30, 'Максимальное количество символов поля name: 30'],
  },
  link: {
    type: String,
    required: [true, 'Поле link обязательное'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [
      mongoose.Schema.Types.ObjectId,
    ],
    ref: 'user',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);