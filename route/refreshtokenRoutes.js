const router = require('express').Router();
const refreshtokenController = require('../controllers/refreshtokenController.js');

router.post('/', refreshtokenController.refreshToken);

module.exports = router;