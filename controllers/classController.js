const asyncHandler = require("express-async-handler");
const db = require("../models/index");
const { Op, where } = require("sequelize");

const allClass = asyncHandler(async (req,res) =>{
    const IDuser = req.i;
    if (!IDuser) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const user = await db.User.findByPk(IDuser,{
        attributes: [],
      include: {
        model: db.Class,
        attributes: ["id","name","section"],
        through: {
          model: db.User_Class,
          attributes: [],
        },
        }
    })

    const Allcalss = user.Classes;
    return res.status(200).json({class: Allcalss})
})

const classInfo = asyncHandler(async (req,res) =>{
    const IDuser = req.i;
    const { classId } = req.params
    if (!IDuser) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const classInfo = await db.Class.findOne({
        where:[{
            id: classId
        }],
        attributes:["id","name","section","description"],
        include: [{
            model: db.User,
            attributes: [],
            where:[{
                id: IDuser
            }],
            through: {
              model: db.User_Class,
              attributes: [],
            },
            required: true,
            },{
                module: db.Post,
                attributes:["id","created_by","title","description"],
                include:{
                  model: db.Comment,
                  attributes:["id","description"],
                  include:{
                    model: db.User,
                    attributes: ["email"],
                  }
                },
            }]
    })
    if(!classInfo){
      res.status(404).json({message: "user not in class"})
    }
    
    const Allpost = classInfo.Posts;
    return res.status(200).json({
        name: classInfo.name,
        section:classInfo.section,
        description: classInfo.description,
        post: Allpost
    })
})

const classCreate = asyncHandler(async (req,res) =>{
  const IDuser = req.i;
  const { name,section,description ,userInclass} = req.body

  if (!IDuser) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  const newClass = await db.Class.create({
    name: name,
    section: section,
    description: description,
  });

  if (userInclass && userInclass.length > 0) {
    const userIDs = userInclass.map((user) => user.id);
    const users = await db.User.findAll({
      where: { id: userIDs },
    });
    await newClass.addUsers(users);
  }

  res.status(200).json({ message: "Class created successfully" });
});

const classUpdate = asyncHandler(async (req,res) =>{
  const IDuser = req.i;
  const { name,section,description ,userInclass,userOutclass} = req.body
  const { classId } = req.params
  if (!IDuser) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  const newClass = await db.Class.update({
    name: name,
    section: section,
    description: description,
  },{
    where: {id: classId}
  }
);

  if (userInclass && userInclass.length > 0) {
    const userIDs = userInclass.map((user) => user.id);
    const users = await db.User.findAll({
      where: { id: userIDs },
    });
    await newClass.addUsers(users);
  }

  if (userOutclass && userOutclass.length > 0) {
    const userIDs = userOutclass.map((user) => user.id);
    const users = await db.User.findAll({
      where: { id: userIDs },
    });
    await newClass.removeUsers(users);
  }

  res.status(200).json({ message: "Class update successfully" });
});

const classDel = asyncHandler(async (req,res) =>{
  const IDuser = req.i;
  const { classId } = req.params

  if (!IDuser) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  await db.Class.destroy({
    where: { id: classId },
  })

  res.status(200).json({ message: "Class delete successfully"});
});

module.exports = {
    allClass,
    classInfo,
    classCreate,
    classUpdate,
    classDel
}