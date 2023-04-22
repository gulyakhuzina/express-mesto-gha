const handleErrors = (err, res) => {
  if (err.name === 'DocumentNotFoundError') {
    res.status(404).send('Запрашиваемые данные не найдены');
  } else if (err.name === 'CastError') {
    res.status(400).send('Переданы некорректные данные: ' + err.message);
  } else if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map((error) => error.message)
      .join('; ');
    res.status(400).send(message);
  } else {
    res.status(500).send('Что-то пошло не так');
  }
};

module.exports = handleErrors;