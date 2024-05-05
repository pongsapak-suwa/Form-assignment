"use strict";
const { DataTypes } = require('sequelize');


module.exports = function(sequelize, Sequelize ) {
    const User = sequelize.define('User', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        email:{
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        password:{
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('student', 'teacher', 'admin'),
            allowNull: false
        },
      }, {
        tableName: 'User',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
      });

    const Student = sequelize.define('Student', {
        id:{
            allowNull: false,
            autoIncrement:true,
            primaryKey: true,
            type: DataTypes.INTEGER,
          },
          userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'User', // References the User table
              key: 'id',      // References the id column in the Users table
            },
            nameTH:{
              type: DataTypes.STRING(255),
              allowNull: true,
            },
            nicknameTH:{
              type: DataTypes.STRING(255),
              allowNull: true,
            },
            nameEN:{
              type: DataTypes.STRING(255),
              allowNull: true,
            },
            nicknameEN:{
              type: DataTypes.STRING(255),
              allowNull: true,
            },
            gender:{
              type: DataTypes.STRING(10),
              allowNull: true,
            },
            birthday:{
              type: DataTypes.DATEONLY,
              allowNull: true,
            },
            telephone:{
              type: DataTypes.CHAR(10),
              allowNull: true,
            },
            citizen:{
              type: DataTypes.CHAR(13),
              allowNull: true,
            },
            image: {
              type: DataTypes.STRING,
              allowNull: true
            },
            onUpdate: 'CASCADE', 
            onDelete: 'CASCADE',
          },
          school:{
            type: DataTypes.STRING(255),
            allowNull: true,
          },
      }, {
        tableName: 'Student',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
      });

      const Teacher = sequelize.define('Teacher', {
        id:{
            allowNull: false,
            autoIncrement:true,
            primaryKey: true,
            type: DataTypes.INTEGER,
          },
          userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'User', // References the User table
              key: 'id',      // References the id column in the User table
            },
            onUpdate: 'CASCADE', 
            onDelete: 'CASCADE',
          },
          nameTH:{
            type: DataTypes.STRING(255),
            allowNull: true,
          },
          nicknameTH:{
            type: DataTypes.STRING(255),
            allowNull: true,
          },
          nameEN:{
            type: DataTypes.STRING(255),
            allowNull: true,
          },
          nicknameEN:{
            type: DataTypes.STRING(255),
            allowNull: true,
          },
          gender:{
            type: DataTypes.STRING(10),
            allowNull: true,
          },
          birthday:{
            type: DataTypes.DATEONLY,
            allowNull: true,
          },
          telephone:{
            type: DataTypes.CHAR(10),
            allowNull: true,
          },
          citizen:{
            type: DataTypes.CHAR(13),
            allowNull: true,
          },
          image: {
            type: DataTypes.STRING,
            allowNull: true
          },
          id_line:{
            type: DataTypes.STRING(255),
            allowNull: true,
          },
          bank:{
            type: DataTypes.STRING(255),
            allowNull: true,
          },
          id_bank:{
            type: DataTypes.CHAR(20),
            allowNull: true,
          },
      }, {
        tableName: 'Teacher',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
      });

      const Class = sequelize.define('Class', {
        id:{
            allowNull: false,
            autoIncrement:true,
            primaryKey: true,
            type: DataTypes.INTEGER,
          },
          name:{
            type: DataTypes.STRING(255),
            allowNull: true,
          },
          section: {
            type: DataTypes.STRING(255),
            allowNull: true,
          },
          description:{
            type: DataTypes.STRING(8000),
            allowNull: true,
          },
          image: {
            type: DataTypes.STRING,
            allowNull: true
          },
      }, {
        tableName: 'Class',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
      });

      const Student_Class = sequelize.define('Student_Class', {
        id:{
            allowNull: false,
            autoIncrement:true,
            primaryKey: true,
            type: DataTypes.INTEGER,
          },
          studentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'Student', // References the Students table
              key: 'id',      // References the id column in the Students table
            },
            onUpdate: 'CASCADE', // Optional: define action on update
            onDelete: 'CASCADE', // Optional: define action on delete
          },
          id_class: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'Class', // References the Class table
              key: 'id',      // References the id column in the Class table
            },
            onUpdate: 'CASCADE', // Optional: define action on update
            onDelete: 'CASCADE', // Optional: define action on delete
          },
      }, {
        tableName: 'Student_Class',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
      });

      const Teacher_Class = sequelize.define('Teacher_Class', {
        id:{
            allowNull: false,
            autoIncrement:true,
            primaryKey: true,
            type: DataTypes.INTEGER,
          },
          teacherId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Teacher', // References the Teachers table
                key: 'id',      // References the id column in the Teachers table
              },
            onUpdate: 'CASCADE', // Optional: define action on update
            onDelete: 'CASCADE', // Optional: define action on delete
          },
          id_class: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'Class', // References the Class table
              key: 'id',      // References the id column in the Class table
            },
            onUpdate: 'CASCADE', // Optional: define action on update
            onDelete: 'CASCADE', // Optional: define action on delete
          },
      }, {
        tableName: 'Teacher_Class',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
      });

      const Post = sequelize.define('Post', {
        id:{
            allowNull: false,
            autoIncrement:true,
            primaryKey: true,
            type: DataTypes.INTEGER,
          },
          id_class: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'Class', // References the Class table
              key: 'id',      // References the id column in the Class table
            },
            onUpdate: 'CASCADE', // Optional: define action on update
            onDelete: 'CASCADE', // Optional: define action on delete
          },
          userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'User', // References the User table
              key: 'id',      // References the id column in the User table
            },
            onUpdate: 'CASCADE', // Optional: define action on update
            onDelete: 'CASCADE', // Optional: define action on delete
          },
          title:{
            type: DataTypes.STRING(255),
            allowNull: false,
          },
          created_by:{
            type: DataTypes.STRING(255),
            allowNull: true,
          },
          description:{
            type: DataTypes.STRING(8000),
            allowNull: true,
          },
      }, {
        tableName: 'Post',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
      });

      const Comment = sequelize.define('Comment', {
        id:{
            allowNull: false,
            autoIncrement:true,
            primaryKey: true,
            type: DataTypes.INTEGER,
          },
          id_post: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'Post', // References the Post table
              key: 'id',      // References the id column in the Post table
            },
            onUpdate: 'CASCADE', // Optional: define action on update
            onDelete: 'CASCADE', // Optional: define action on delete
          },
          userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'User', // References the User table
              key: 'id',      // References the id column in the User table
            },
            onUpdate: 'CASCADE', // Optional: define action on update
            onDelete: 'CASCADE', // Optional: define action on delete
          },
          description:{
            type: DataTypes.STRING(8000),
            allowNull: true,
          },
      }, {
        tableName: 'Comment',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
      });

      const Form = sequelize.define('Form', {
        id:{
            allowNull: false,
            autoIncrement:true,
            primaryKey: true,
            type: DataTypes.INTEGER,
          },
          id_class: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'Class', // References the Class table
              key: 'id',      // References the id column in the Class table
            },
            onUpdate: 'CASCADE', // Optional: define action on update
            onDelete: 'CASCADE', // Optional: define action on delete
          },
          id_teacher: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'Teacher', // References the Teachers table
              key: 'id',      // References the id column in the Teachers table
            },
            onUpdate: 'CASCADE', // Optional: define action on update
            onDelete: 'CASCADE', // Optional: define action on delete
          },
          topic:{
            type: DataTypes.STRING(255),
            allowNull: false,
          },
          created_by:{
            type: DataTypes.STRING(255),
            allowNull: true,
          },
          description:{
            type: DataTypes.STRING(8000),
            allowNull: true,
          },
          max_score:{
            type: DataTypes.STRING(255),
            allowNull: true,
          },
          submission_time: {
            allowNull: true,
            type: DataTypes.DATE,
          },
          file: {
            type: DataTypes.STRING,
            allowNull: true
          },
      }, {
        tableName: 'Form',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
      });

      const Submission = sequelize.define('Submission', {
        id:{
            allowNull: false,
            autoIncrement:true,
            primaryKey: true,
            type: DataTypes.INTEGER,
          },
          id_form: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'Form', // References the Form table
              key: 'id',      // References the id column in the Form table
            },
            onUpdate: 'CASCADE', // Optional: define action on update
            onDelete: 'CASCADE', // Optional: define action on delete
          },
          id_student: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'Student', // References the Student table
              key: 'id',      // References the id column in the Student table
            },
            onUpdate: 'CASCADE', // Optional: define action on update
            onDelete: 'CASCADE', // Optional: define action on delete
          },
          id_teacher: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
              model: 'Teacher', // References the Teachers table
              key: 'id',      // References the id column in the Teachers table
            },
            onUpdate: 'CASCADE', // Optional: define action on update
            onDelete: 'CASCADE', // Optional: define action on delete
          },
          status: {
            type: DataTypes.BOOLEAN,
            allowNull: true
          },
          feddback: {
            type: DataTypes.STRING,
            allowNull: true
          },
          score: {
            type: DataTypes.INTEGER,
            allowNull: true
          },
          body:{
            type: DataTypes.INTEGER,
            allowNull: true,
          },
          file: {
            type: DataTypes.STRING,
            allowNull: true
          },
      }, {
        tableName: 'Submission',
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
      });

    return {
        User,
        Student,
        Teacher,
        Class,
        Student_Class,
        Teacher_Class,
        Post,
        Comment,
        Form,
        Submission
    }
};