const { prisma } = require('../prisma/prisma-client')
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
  try {
    let token = req.headers.authorization?.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET)

    const user = await prisma.user.findUnique({
      where: {
        id: decode.id
      }
    })
    req.user = user;
    next()
  } catch {
    res.status(400).json({ message: 'Not authorized' })
  }
}
module.exports = auth