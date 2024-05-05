require('dotenv').config()


const ROLES_LIST = {
    'Admin': process.env.ROLES_ADMIN,
    'Teacher':  process.env.ROLES_TEACHER,
    'Student': process.env.ROLES_STUDENT
}

const findRoleByPriority = (priority) => {
    for (const [role, value] of Object.entries(ROLES_LIST)) {
        if (value === priority) {
            return role;
        }
    }
    return null; 
};

const findPriorityByRole = (roleName) => {
    for (const [role, priority] of Object.entries(ROLES_LIST)) {
        if (role === roleName) {
            return priority;
        }
    }
    return null; 
};

module.exports =  {
    ROLES_LIST,
    findRoleByPriority,
    findPriorityByRole
};