const express = require('express');

const router = require('express-promise-router')();

const UsersController = require('../controllers/controllereinloggen')

router.route('/register')
    .post(UsersController.register);
router.route('/login')
    .post(UsersController.login)
router.route('/getUserProfile')
    .get(UsersController.getUserProfile);

module.exports = router;