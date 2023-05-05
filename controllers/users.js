const { prisma } = require('../prisma/prisma-client')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ message: 'Please fill in the field login' })
    }
    const user = await prisma.user.findFirst({
      where: {
        email
      }
    });
    const isPasswordCorrect = user && (await bcrypt.compare(password, user?.password));
    const secret = process.env.JWT_SECRET;

    if (user && isPasswordCorrect && secret) {
      return res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: "30d" }),
      })
    } else {
      return res.status(400).json({ message: 'Not correct email our password' })
    }
  } catch {
    return res.status(400).json({ message: 'Oops mistakes' })
  }
}
const register = async (req, res) => {
  try {
    const { email, password, name } = req.body
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Please fill in the fields register' })
    }
    const registerUser = await prisma.user.findFirst({
      where: {
        email
      }
    });
    if (registerUser) {
      return res.status(400).json({
        message: 'User already exists'
      })
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      }
    })
    const secret = process.env.JWT_SECRET;
    if (user && secret) {
      res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: "30d" }),
      })
    } else {
      return res.status(400).json({ message: 'Don not created user' })
    }
  } catch {
    res.status(400).json({ message: 'Not correct, wroing' })
  }
}
const current = async (req, res) => {
  return res.status(200).json(req.user)
}
module.exports = { login, register, current }