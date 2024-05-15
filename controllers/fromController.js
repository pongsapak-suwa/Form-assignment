const asyncHandler = require("express-async-handler");
const db = require("../models/index");
const { Op, where } = require("sequelize");

const allForm = asyncHandler(async (req,res) =>{
    const IDuser = req.i;
    const { classId } = req.params

    if (!IDuser) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const classInfo = await db.Class.findByPk(classId,{
        attributes: [],
      include: {
        model: db.Form,
        attributes: ["id","created_by","topic","description","max_score","submission_time"],
        through: {
          model: db.User_Class,
          attributes: [],
        },
        }
    })

    const Allform = classInfo.Forms;
    return res.status(200).json({form: Allform})
})

const formInfo = asyncHandler(async (req,res) =>{
    const IDuser = req.i;
    const { formId } = req.params
    if (!IDuser) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const formInfo = await db.Form.findOne({
        where:[{
            id: formId
        }],
        attributes: ["id","created_by","topic","description","max_score","submission_time"],
    })

    if(!formInfo){
      res.status(404).json({message: "user not in class"})
    }
    
    return res.status(200).json(formInfo)
})

const formCreate = asyncHandler(async (req,res) =>{
  const IDuser = req.i;
  const { classId } = req.params
  const { topic,description,max_score ,submission_time} = req.body

  if (!IDuser) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  const newForm = await db.Form.create({
    topic: topic,
    max_score: max_score,
    description: description,
    submission_time: submission_time,
    id_class:classId
  });

  res.status(200).json({ message: "Form created successfully" });
});

const formUpdate = asyncHandler(async (req,res) =>{
  const IDuser = req.i;
  const { topic,description,max_score ,submission_time} = req.body
  const { formId } = req.params
  if (!IDuser) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  const newForm = await db.Form.update({
    topic: topic,
    max_score: max_score,
    description: description,
    submission_time: submission_time,
    id_class:classId
  },{
    where: {id: formId}
  }
);


  res.status(200).json({ message: "Form update successfully" });
});

const formDel = asyncHandler(async (req,res) =>{
  const IDuser = req.i;
  const { formId } = req.params

  if (!IDuser) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  await db.Form.destroy({
    where: { id: formId },
  })

  res.status(200).json({ message: "Form delete successfully"});
});

module.exports = {
    allForm,
    formCreate,
    formInfo,
    formUpdate,
    formDel,
    submissionCreate,
    submissionUpdate
}