const asyncHandler = require("express-async-handler");
const db = require("../models/index");

const profileStudent = asyncHandler(async (req, res) => {
      const IDuser = req.i;
      if (!IDuser) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }
      const user = await db.User.findByPk(IDuser, {
        attributes: [
          "id",
          "email",
        ],
        include: [{ model: db.Student, 
            attributes: [
            "school",
            "nameTH",
            "nicknameTH",
            "nameEN",
            "nicknameEN",
            "gender",
            "birthday",
            "telephone"
        ], 
        }],
      });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const [year, month, day] = user.Student.birthday.split("-");
      const formattedDate = `${day}/${month}/${year}`;
  
      const transformedData = {
        id: user.id,
        email: user.email,
        nameTH: user.Student.nameTH,
        nicknameTH: user.Student.nicknameTH,
        nameEN: user.Student.nameEN,
        nicknameEN: user.Student.nicknameEN,
        school: user.Student.school,
        telephone: user.Student.telephone,
        birthday: formattedDate,
      };
  
      return res.status(200).json(transformedData);
  });

  const profileTeacher = asyncHandler(async (req, res) => {
    const IDuser = req.i;
    if (!IDuser) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const user = await db.User.findByPk(IDuser, {
      attributes: [
        "id",
        "email",
      ],
      include: [{ model: db.Teacher, 
          attributes: [
          "id_line",
          "nameTH",
          "nicknameTH",
          "nameEN",
          "nicknameEN",
          "gender",
          "birthday",
          "telephone"
      ], 
      }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const [year, month, day] = user.Student.birthday.split("-");
    const formattedDate = `${day}/${month}/${year}`;

    const transformedData = {
      id: user.id,
      email: user.email,
      nameTH: user.Teacher.nameTH,
      nicknameTH: user.Teacher.nicknameTH,
      nameEN: user.Teacher.nameEN,
      nicknameEN: user.Teacher.nicknameEN,
      school: user.Teacher.school,
      telephone: user.Teacher.telephone,
      id_line: user.Teacher.id_line,
      birthday: formattedDate,
    };

    return res.status(200).json(transformedData);
});

const imageStudent = asyncHandler(async (req, res) => {
      const IDuser = req.i;
  
      //console.log(req.id)
      if (!IDuser) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }
      
      const user = await db.User.findByPk(IDuser, {
        include: [{ model: db.Student, 
            attributes: [
            "image"
        ], 
        }],
      });
      if ((!user, !user.image)) {
        return res.status(404).json({ message: "User image not found" });
      }
  
      return res
        .setHeader("Content-Type", "image/jpeg")
        .status(200)
        .send(user.Student.image);
  });
  
  const imageTeacher = asyncHandler(async (req, res) => {
      const IDuser = req.i;
        if (!IDuser) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }
  
      const user = await db.User.findByPk(IDuser, {
        include: [{ model: db.Teacher, 
            attributes: [
            "image"
        ], 
        }],
      });
      if (!user) {
        return res.status(404).json({ message: "User image not found" });
      }
  
      return res
        .setHeader("Content-Type", "image/jpeg")
        .status(200)
        .send(user.Teacher.image);
  });
module.exports = {
    profileStudent,
    profileTeacher,
    imageStudent,
    imageTeacher,
};