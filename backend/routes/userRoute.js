const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/find' , userController.findUser);
router.post('/create' , userController.createUser);

module.exports= router;