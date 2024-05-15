const asyncHandler = require("express-async-handler");
const db = require("../models/index");
const { Op, where } = require("sequelize");


const postCreate = asyncHandler(async (req,res) =>{
    const IDuser = req.i;
    const { description ,title} = req.body
    const { classId } = req.params
  
    if (!IDuser) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const user = await db.User.findByPk(IDuser)

    const newPost = await db.Comment.create({
      id_class: classId,
      title: title,
      created_by: user.name,
      userId: IDuser,
      description: description,
    });
  
  
    res.status(200).json({ message: "Post created successfully", post: newPost });
  });

  const postUpdate = asyncHandler(async (req,res) =>{
    const IDuser = req.i;
    const { id,description ,title} = req.body
    const { classId } = req.params
    if (!IDuser) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    
    await db.Comment.update({
        title: title,
      description: description,
    },{
      where: {id: id,userId: IDuser,id_class:classId}
    }
  );
  
    res.status(200).json({ message: "Post update successfully" });
  });

  const postDel = asyncHandler(async (req,res) =>{
    const IDuser = req.i;
    const { id} = req.body
    const { classId } = req.params
  
    if (!IDuser) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    await db.Class.destroy({
        where: {id: id,userId: IDuser,id_class:classId}
    })
  
    res.status(200).json({ message: "Post delete successfully"});
  });

  module.exports = {
    postCreate,
    postUpdate,
    postDel
  }