const express = require('express');

const app = express();
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const { celebrate, Joi, errors } = require('celebrate');
const { userRoute, cardRoute } = require('./routes/index');
const {
  createUser, login,
} = require('./controllers/users');
const auth = require('./middlewares/auth');
const handleErrors = require('./middlewares/handleErrors');
const NotFoundError = require('./errors/not_found_err');

// eslint-disable-next-line no-useless-escape
const reg = /https?:\/\/w{0,3}[\w\-\.~:/?#\[\]@!$&'\(\)*\+,;=]*\#?$/mi;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', { useNewUrlParser: true });

app.use(express.json());

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(reg),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.use(auth);

app.use('/users', auth, userRoute);
app.use('/cards', auth, cardRoute);

app.use('*', (req, res, next) => next(new NotFoundError('Страница не найдена')));

app.use(errors());

app.use(handleErrors);

app.listen(PORT);