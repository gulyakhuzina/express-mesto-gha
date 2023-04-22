const express = require('express');

const userRoute = express.Router();
const {
  getUsers, getUser, createUser, updateProfile, updateAvatar,
} = require('../controllers/users');

userRoute.get('/users', getUsers);
userRoute.get('/users/:userId', getUser);
userRoute.post('/users', createUser);
userRoute.patch('/users/me', updateProfile);
userRoute.patch('/users/me/avatar', updateAvatar);

module.exports = userRoute;