const express = require('express');

const app = express();
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const { celebrate, Joi, errors } = require('celebrate');
const userRoute = require('./routes/users');
const cardRoute = require('./routes/cards');
const {
  createUser, login,
} = require('./controllers/users');
const auth = require('./middlewares/auth');
const handleErrors = require('./middlewares/handleErrors');

const ERROR_NOT_FOUND = 404;

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
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().regex(/https?:\/\/w{0,3}[\w\-\.~:/?#\[\]@!$&'\(\)*\+,;=]*\#?$/mi),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.use(auth);

app.use('/users', auth, userRoute);
app.use('/cards', auth, cardRoute);

app.use('*', (req, res) => {
  res.status(ERROR_NOT_FOUND).send({ message: 'Страница не найдена' });
});

app.use(errors());

app.use(handleErrors);

app.listen(PORT);