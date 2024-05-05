const router = require('express').Router();
const authController = require('../controllers/authController')

router.route('/login').post(authController.userLogin);

router.route('/signup').post(authController.userSignup);

module.exports = router;