const User = require('../models/user');
const handleErrors = require('./handleErrors');

const getUsers = (req, res) => {
  User.find()
    .then((users) => {
      res.send({ data: users });
    })
    .catch((err) => {
      handleErrors(err, res);
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      handleErrors(err, res);
    });
};

const createUser = (req, res) => {
  const { name, avatar, about } = req.body;
  User.create({ name, avatar, about })
    .then((user) => {
      res.status(201).send({ data: user });
    })
    .catch((err) => {
      handleErrors(err, res);
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .orFail()
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      handleErrors(err, res);
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .orFail()
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      handleErrors(err, res);
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
};