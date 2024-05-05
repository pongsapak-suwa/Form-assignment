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
                attributes:["created_by","title","description"],
            }]
    })

    const Allpost = classInfo.Posts;
    return res.status(200).json({
        name: classInfo.name,
        section:classInfo.section,
        description: classInfo.description,
        post: Allpost
    })
})

module.exports = {
    allClass,
    classInfo
}