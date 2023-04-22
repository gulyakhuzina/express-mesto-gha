const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { PORT = 3005 } = process.env;
const userRoute = require('./routes/users');
const cardRoute = require('./routes/cards');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '6442d81dd6b98ab8e16444bb',
  };

  next();
});

app.use(userRoute);
app.use(cardRoute);

app.listen(PORT, () => {
  console.log('Сервер подключен к порту ' + PORT);
});