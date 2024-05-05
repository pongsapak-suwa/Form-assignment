'use strict';

const Sequelize = require('sequelize');
const process = require('process');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const definetable = require('./table');
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = definetable(sequelize , Sequelize).User;
db.Student = definetable(sequelize , Sequelize).Student;
db.Teacher = definetable(sequelize , Sequelize).Teacher;
db.Class = definetable(sequelize , Sequelize).Class;
db.Student_Class = definetable(sequelize , Sequelize).Student_Class;
db.Teacher_Class = definetable(sequelize , Sequelize).Teacher_Class;
db.Post = definetable(sequelize , Sequelize).Post;
db.Comment = definetable(sequelize , Sequelize).Comment;
db.Form = definetable(sequelize , Sequelize).Form;
db.Submission = definetable(sequelize , Sequelize).Submission;

db.Student.belongsTo(db.User, { foreignKey: 'userId' , onDelete: 'CASCADE'});
db.User.hasOne(db.Student, { foreignKey: 'userId' });

db.Teacher.belongsTo(db.User, { foreignKey: 'userId' , onDelete: 'CASCADE'});
db.User.hasOne(db.Teacher, { foreignKey: 'userId' });

db.Student.belongsToMany(db.Class, { through: db.Student_Class , foreignKey: 'studentId' ,onDelete: 'CASCADE'} );
db.Class.belongsToMany(db.Student, { through: db.Student_Class , foreignKey: 'id_class' ,onDelete: 'CASCADE'} );

db.Teacher.belongsToMany(db.Class, { through: db.Teacher_Class , foreignKey: 'teacherId' ,onDelete: 'CASCADE'} );
db.Class.belongsToMany(db.Teacher, { through: db.Teacher_Class , foreignKey: 'id_class' ,onDelete: 'CASCADE'} );

db.Post.belongsTo(db.Class, { foreignKey: 'id_class' ,onDelete: 'CASCADE'});
db.Class.hasMany(db.Post, { foreignKey: 'id_class' });

db.Post.belongsTo(db.User, { foreignKey: 'userId' ,onDelete: 'CASCADE'});
db.User.hasMany(db.Post, { foreignKey: 'userId' });

db.Comment.belongsTo(db.Post, { foreignKey: 'id_post' ,onDelete: 'CASCADE'});
db.Post.hasMany(db.Comment, { foreignKey: 'id_post' });

db.Comment.belongsTo(db.User, { foreignKey: 'userId' ,onDelete: 'CASCADE'});
db.User.hasMany(db.Comment, { foreignKey: 'userId' });

db.Form.belongsTo(db.Class, { foreignKey: 'id_class' ,onDelete: 'CASCADE'});
db.Class.hasMany(db.Form, { foreignKey: 'id_class' });

db.Form.belongsTo(db.Teacher, { foreignKey: 'id_teacher' ,onDelete: 'CASCADE'});
db.Teacher.hasMany(db.Form, { foreignKey: 'id_teacher' });

db.Submission.belongsTo(db.Form, { foreignKey: 'id_form' ,onDelete: 'CASCADE'});
db.Form.hasMany(db.Submission, { foreignKey: 'id_form' });

db.Submission.belongsTo(db.Student, { foreignKey: 'id_student' ,onDelete: 'CASCADE'});
db.Student.hasMany(db.Submission, { foreignKey: 'id_student' });

db.Submission.belongsTo(db.Teacher, { foreignKey: 'id_teacher' ,onDelete: 'CASCADE'});
db.Teacher.hasMany(db.Submission, { foreignKey: 'id_teacher' });

module.exports = db;
