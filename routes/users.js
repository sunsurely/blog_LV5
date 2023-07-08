const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

const UsersController = new usersController();

router.post('/signup', UsersController.createUser);

module.exports = router;
