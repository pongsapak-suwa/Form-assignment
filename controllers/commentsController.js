const asyncHandler = require("express-async-handler");
const db = require("../models/index");
const { Op, where } = require("sequelize");


const comCreate = asyncHandler(async (req,res) =>{
    const IDuser = req.i;
    const { description} = req.body
    const { postId } = req.params
  
    if (!IDuser) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const newCom = await db.Comment.create({
      id_post: postId,
      userId: IDuser,
      description: description,
    });
  
  
    res.status(200).json({ message: "Comment created successfully", class: newClass });
  });

  const comUpdate = asyncHandler(async (req,res) =>{
    const IDuser = req.i;
    const { id,description} = req.body
    const { postId } = req.params
    if (!IDuser) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    
    await db.Comment.update({
      description: description,
    },{
      where: {id: id,userId: IDuser,id_post:postId}
    }
  );
  
    res.status(200).json({ message: "Comment update successfully", class: newClass });
  });

  const comDel = asyncHandler(async (req,res) =>{
    const IDuser = req.i;
    const { id} = req.body
    const { postId } = req.params
  
    if (!IDuser) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    await db.Class.destroy({
        where: {id: id,userId: IDuser,id_post:postId}
    })
  
    res.status(200).json({ message: "Comment delete successfully", class: newClass });
  });

  module.exports = {
    comCreate,
    comUpdate,
    comDel
  }