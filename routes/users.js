const express = require('express');

const userRoute = express.Router();
const {
  getUsers, getUser, createUser, updateProfile, updateAvatar,
} = require('../controllers/users');

userRoute.get('/', getUsers);
userRoute.get('/:userId', getUser);
userRoute.post('/', createUser);
userRoute.patch('/me', updateProfile);
userRoute.patch('/me/avatar', updateAvatar);

module.exports = userRoute;