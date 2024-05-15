const router = require('express').Router();
const verifyJWT = require('../middlewares/verifyJWT.js');
const { ROLES_LIST } = require('../config/roles_list.js');
const postController = require('../controllers/postController.js');
require("dotenv").config();

router.route('/:classId')
    .post(verifyJWT(ROLES_LIST.Teacher,ROLES_LIST.Student,ROLES_LIST.Admin),postController.postCreate)
    .put(verifyJWT(ROLES_LIST.Teacher,ROLES_LIST.Student,ROLES_LIST.Admin),postController.postUpdate)
    .delete(verifyJWT(ROLES_LIST.Teacher,ROLES_LIST.Student,ROLES_LIST.Admin),postController.postDel);



module.exports = router;