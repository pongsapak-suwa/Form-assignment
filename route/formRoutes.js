const router = require('express').Router();
const verifyJWT = require('../middlewares/verifyJWT.js');
const { ROLES_LIST } = require('../config/roles_list.js');
const fromController = require('../controllers/fromController.js');
require("dotenv").config();

router.route('/:classId')
    .get(verifyJWT(ROLES_LIST.Teacher,ROLES_LIST.Student,ROLES_LIST.Admin),fromController.allForm)
    .post(verifyJWT(ROLES_LIST.Teacher,ROLES_LIST.Admin),fromController.formCreate);

router.route('/:formId')
    .get(verifyJWT(ROLES_LIST.Teacher,ROLES_LIST.Student,ROLES_LIST.Admin),fromController.formInfo)
    .put(verifyJWT(ROLES_LIST.Teacher,ROLES_LIST.Admin),fromController.formUpdate)
    .delete(verifyJWT(ROLES_LIST.Teacher,ROLES_LIST.Admin),fromController.formDel);

router.route('/:formId/submission')
    .post(verifyJWT(ROLES_LIST.Student),fromController.submissionCreate)
    .put(verifyJWT(ROLES_LIST.Student),fromController.submissionUpdate)


module.exports = router;