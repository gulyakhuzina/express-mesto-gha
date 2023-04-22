const { default: mongoose } = require('mongoose');

const { DocumentNotFoundError, CastError, ValidationError } = mongoose.Error;

const ERROR_BAD_REQUEST = 400;
const ERROR_NOT_FOUND = 404;
const ERROR_SERVER = 500;

const handleErrors = (err, res) => {
  if (err instanceof DocumentNotFoundError) {
    res.status(ERROR_NOT_FOUND).send({ message: 'Запрашиваемые данные не найдены' });
  } else if (err instanceof CastError) {
    res.status(ERROR_BAD_REQUEST).send({ message: `Переданы некорректные данные: ${err.message}` });
  } else if (err instanceof ValidationError) {
    const message = Object.values(err.errors)
      .map((error) => error.message)
      .join('; ');
    res.status(ERROR_BAD_REQUEST).send({ message });
  } else {
    res.status(ERROR_SERVER).send({ message: 'Что-то пошло не так' });
  }
};

module.exports = handleErrors;
