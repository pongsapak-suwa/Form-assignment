const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models/index");
const { Op } = require("sequelize");
const { findPriorityByRole } = require('../config/roles_list.js');


const userLogin = asyncHandler(async (req, res) => {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }
  
      const user = await db.User.findOne({
        where: { email },
        attributes: [
          "id",
          "email",
          "password",
          "role",
        ],
      });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: "Incorrect password" });
      }
      const rolePriority = findPriorityByRole(user.role);
  
      const accessToken = jwt.sign(
        {
          i: user.id,
          e: user.email,
          r: user.role,
          p: rolePriority,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "7d" }
      );
  
      const refreshToken = jwt.sign(
        {
            i: user.id,
            e: user.email,
            r: user.role,
            p: rolePriority,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "14d" }
      );
  
      return res.status(200)
      .cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'None', secure: true,
        maxAge: 24 * 60 * 60 * 1000
      }).json({
        accessToken,
        refreshToken,
      });
  });

  const userSignup = asyncHandler(async (req, res) => {
    const  {newUser}  = req.body;

    if (!newUser || !newUser.email || !newUser.password) {
        return res.status(400).json({message: "All fields are required"});
    }
    const existingUser = await db.User.findOne({
        where: {
            [Op.or]: [
            { email: newUser.email.trim() },
            ]
        }
    });

    if (existingUser) {
    return res.status(400).json({ message: "User with this already exists" });
    }

    const hashedPwd = await bcrypt.hash(user.password, 10);
    const user = await db.User.create({
        email: newUser.email.trim(),
        password: hashedPwd,
        role: newUser.role,
    });

    if(role === 'student'){
        await db.Student.create({
            userId: user.id,
            nameTH: newUser.nameTH.trim(),
            nicknameTH: newUser.nicknameTH.trim(),
            nameEN: newUser.nameEN.trim(),
            nicknameEN: newUser.nicknameEN.trim(),
            gender: newUser.gender.trim(),
            citizen: newUser.citizenID.trim(),
            birthday: newUser.date.trim(),
            telephone: newUser.telephone.trim(),
            school: newUser.school.trim()
        })
    }else if(role === 'teacher'){
        const formattedIdbank = bankNumber
      .trim()
      .replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, "$1-$2-$3-$4");
        await db.Teacher.create({
            userId: user.id,
            nameTH: newUser.nameTH.trim(),
            nicknameTH: newUser.nicknameTH.trim(),
            nameEN: newUser.nameEN.trim(),
            nicknameEN: newUser.nicknameEN.trim(),
            gender: newUser.gender.trim(),
            citizen: newUser.citizenID.trim(),
            birthday: newUser.date.trim(),
            telephone: newUser.telephone.trim(),
            id_line: LineID.trim(),
            bank: bankName.trim(),
            id_bank: formattedIdbank,
        })
    }

    return res.status(201).json({ message: "User created successfully" });
  });
module.exports = {
    userLogin,
    userSignup
  };