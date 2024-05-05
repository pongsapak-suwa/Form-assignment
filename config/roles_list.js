require('dotenv').config()


const ROLES_LIST = {
    'admin': process.env.ROLES_ADMIN,
    'teacher':  process.env.ROLES_TEACHER,
    'student': process.env.ROLES_STUDENT
}

const findRoleByPriority = (priority) => {
    for (const [role, value] of Object.entries(ROLES_LIST)) {
        if (value === priority) {
            return role;
        }
    }
    return null; 
};


module.exports =  {
    ROLES_LIST,
    findRoleByPriority
};