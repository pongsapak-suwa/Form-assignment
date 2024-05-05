const router = require('express').Router();
const verifyJWT = require('../middlewares/verifyJWT.js');
const { ROLES_LIST } = require('../config/roles_list.js');
const userController = require('../controllers/userController.js');
require("dotenv").config();

router.route("/profile/teacher").get(verifyJWT(ROLES_LIST.Teacher), userController.profileTeacher);
router.route("/image/teacher").get(verifyJWT(ROLES_LIST.Teacher), userController.imageTeacher);


router.route("/profile/student").get(verifyJWT(ROLES_LIST.Student), userController.profileStudent);
router.route("/image/student").get(verifyJWT(ROLES_LIST.Student), userController.imageStudent);

module.exports = router;