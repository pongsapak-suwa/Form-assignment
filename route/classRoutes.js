const router = require('express').Router();
const verifyJWT = require('../middlewares/verifyJWT.js');
const { ROLES_LIST } = require('../config/roles_list.js');
const classController = require('../controllers/classController.js');
require("dotenv").config();

router.route('/')
    .get(verifyJWT(ROLES_LIST.Teacher,ROLES_LIST.Student,ROLES_LIST.Admin),classController.allClass)
    .post(verifyJWT(ROLES_LIST.Teacher,ROLES_LIST.Admin),classController.classCreate);

router.route('/:classId')
    .get(verifyJWT(ROLES_LIST.Teacher,ROLES_LIST.Student,ROLES_LIST.Admin),classController.classInfo)
    .put(verifyJWT(ROLES_LIST.Teacher,ROLES_LIST.Admin),classController.classUpdate)
    .delete(verifyJWT(ROLES_LIST.Teacher,ROLES_LIST.Admin),classController.classDel);



module.exports = router;