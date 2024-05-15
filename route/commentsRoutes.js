const router = require('express').Router();
const verifyJWT = require('../middlewares/verifyJWT.js');
const { ROLES_LIST } = require('../config/roles_list.js');
const commentsController = require('../controllers/commentsController.js');
require("dotenv").config();

router.route('/:postId')
    .post(verifyJWT(ROLES_LIST.Teacher,ROLES_LIST.Student,ROLES_LIST.Admin),commentsController.comCreate)
    .put(verifyJWT(ROLES_LIST.Teacher,ROLES_LIST.Student,ROLES_LIST.Admin),commentsController.comUpdate)
    .delete(verifyJWT(ROLES_LIST.Teacher,ROLES_LIST.Student,ROLES_LIST.Admin),commentsController.comDel);



module.exports = router;