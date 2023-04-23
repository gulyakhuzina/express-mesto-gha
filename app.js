const express = require('express');

const app = express();
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const userRoute = require('./routes/users');
const cardRoute = require('./routes/cards');

const ERROR_NOT_FOUND = 404;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', { useNewUrlParser: true });

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '6442d81dd6b98ab8e16444bb',
  };

  next();
});

app.use('/users', userRoute);
app.use('/cards', cardRoute);

app.use('*', (req, res) => {
  res.status(ERROR_NOT_FOUND).send({ message: 'Страница не найдена' });
});

app.listen(PORT);