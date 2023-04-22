const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле name обязательное'],
    minlength: [2, 'Минимальное количество символов поля name: 2'],
    maxlength: [30, 'Максимальное количество символов поля name: 30'],
  },
  avatar: {
    type: String,
    required: [true, 'Поле avatar обязательное'],
  },
  about: {
    type: String,
    required: [true, 'Поле about обязательное'],
    minlength: [2, 'Минимальное количество символов поля about: 2'],
    maxlength: [30, 'Максимальное количество символов поля about: 30'],
  },
});

module.exports = mongoose.model('user', userSchema);