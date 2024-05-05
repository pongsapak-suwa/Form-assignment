'use strict';

 // create table name users
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (QueryInterface , Sequelize ) => {

    const transaction = await QueryInterface.sequelize.transaction();

    try{
    await QueryInterface.createTable("User",{
      id:{
        allowNull: false,
        autoIncrement:true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email:{
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      password:{
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM('student', 'teacher', 'admin'),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      }
    });

    await QueryInterface.createTable("Student",{
      id:{
        allowNull: false,
        autoIncrement:true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'User', // References the User table
          key: 'id',      // References the id column in the Users table
        },
        nameTH:{
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        nicknameTH:{
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        nameEN:{
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        nicknameEN:{
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        gender:{
          type: Sequelize.STRING(10),
          allowNull: true,
        },
        birthday:{
          type: Sequelize.DATEONLY,
          allowNull: true,
        },
        telephone:{
          type: Sequelize.CHAR(10),
          allowNull: true,
        },
        citizen:{
          type: Sequelize.CHAR(13),
          allowNull: true,
        },
        image: {
          type: Sequelize.STRING,
          allowNull: true
        },
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE',
      },
      school:{
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      }
    });

    await QueryInterface.createTable("Teacher",{
      id:{
        allowNull: false,
        autoIncrement:true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'User', // References the User table
          key: 'id',      // References the id column in the User table
        },
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE',
      },
      nameTH:{
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      nicknameTH:{
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      nameEN:{
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      nicknameEN:{
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      gender:{
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      birthday:{
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      telephone:{
        type: Sequelize.CHAR(10),
        allowNull: true,
      },
      citizen:{
        type: Sequelize.CHAR(13),
        allowNull: true,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true
      },
      id_line:{
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      bank:{
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      id_bank:{
        type: Sequelize.CHAR(20),
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      }
    });

    await QueryInterface.createTable("Class",{
      id:{
        allowNull: false,
        autoIncrement:true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name:{
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      section: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      description:{
        type: Sequelize.STRING(8000),
        allowNull: true,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      }
    });

    await QueryInterface.createTable("User_Class",{
      id:{
        allowNull: false,
        autoIncrement:true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'User', // References the User table
          key: 'id',      // References the id column in the User table
        },
        onUpdate: 'CASCADE', // Optional: define action on update
        onDelete: 'CASCADE', // Optional: define action on delete
      },
      id_class: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Class', // References the Class table
          key: 'id',      // References the id column in the Class table
        },
        onUpdate: 'CASCADE', // Optional: define action on update
        onDelete: 'CASCADE', // Optional: define action on delete
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      }
    });

    await QueryInterface.createTable("Post",{
      id:{
        allowNull: false,
        autoIncrement:true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_class: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Class', // References the Class table
          key: 'id',      // References the id column in the Class table
        },
        onUpdate: 'CASCADE', // Optional: define action on update
        onDelete: 'CASCADE', // Optional: define action on delete
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'User', // References the User table
          key: 'id',      // References the id column in the User table
        },
        onUpdate: 'CASCADE', // Optional: define action on update
        onDelete: 'CASCADE', // Optional: define action on delete
      },
      title:{
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      created_by:{
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      description:{
        type: Sequelize.STRING(8000),
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      }
    });

    await QueryInterface.createTable("Comment",{
      id:{
        allowNull: false,
        autoIncrement:true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_post: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Post', // References the Post table
          key: 'id',      // References the id column in the Post table
        },
        onUpdate: 'CASCADE', // Optional: define action on update
        onDelete: 'CASCADE', // Optional: define action on delete
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'User', // References the User table
          key: 'id',      // References the id column in the User table
        },
        onUpdate: 'CASCADE', // Optional: define action on update
        onDelete: 'CASCADE', // Optional: define action on delete
      },
      description:{
        type: Sequelize.STRING(8000),
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      }
    });

    await QueryInterface.createTable("Form",{
      id:{
        allowNull: false,
        autoIncrement:true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_class: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Class', // References the Class table
          key: 'id',      // References the id column in the Class table
        },
        onUpdate: 'CASCADE', // Optional: define action on update
        onDelete: 'CASCADE', // Optional: define action on delete
      },
      id_teacher: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Teacher', // References the Teachers table
          key: 'id',      // References the id column in the Teachers table
        },
        onUpdate: 'CASCADE', // Optional: define action on update
        onDelete: 'CASCADE', // Optional: define action on delete
      },
      topic:{
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      created_by:{
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      description:{
        type: Sequelize.STRING(8000),
        allowNull: true,
      },
      max_score:{
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      submission_time: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      file: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      }
    });

    await QueryInterface.createTable("Submission",{
      id:{
        allowNull: false,
        autoIncrement:true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_form: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Form', // References the Form table
          key: 'id',      // References the id column in the Form table
        },
        onUpdate: 'CASCADE', // Optional: define action on update
        onDelete: 'CASCADE', // Optional: define action on delete
      },
      id_student: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Student', // References the Student table
          key: 'id',      // References the id column in the Student table
        },
        onUpdate: 'CASCADE', // Optional: define action on update
        onDelete: 'CASCADE', // Optional: define action on delete
      },
      id_teacher: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Teacher', // References the Teachers table
          key: 'id',      // References the id column in the Teachers table
        },
        onUpdate: 'CASCADE', // Optional: define action on update
        onDelete: 'CASCADE', // Optional: define action on delete
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      feddback: {
        type: Sequelize.STRING,
        allowNull: true
      },
      score: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      body:{
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      file: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      }
    });

  } catch (error) {
      await transaction.rollback();
      throw error;
  }
  },
  down: async (QueryInterface , Sequelize ) => {
    try {
      await QueryInterface.dropTable("Submission"),
      await QueryInterface.dropTable("Form"),
      await QueryInterface.dropTable("Comment"),
      await QueryInterface.dropTable("Post"),
      await QueryInterface.dropTable("User_Class"),
      await QueryInterface.dropTable("Class"),
      await QueryInterface.dropTable("Teacher"),
      await QueryInterface.dropTable("Student"),
      await QueryInterface.dropTable("User")
  } catch (error) {
      throw error;
  }
  }
};