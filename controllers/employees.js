const { prisma } = require('../prisma/prisma-client')

const all = async (req, res) => {
  try {
    const employee = await prisma.employee.findMany()
    res.status(200).json(employee)
  } catch {
    res.status(400).json({ message: 'Failed to get employee' })
  }
}

const add = async (req, res) => {
  const data = req.body
  if (!data.lastName || !data.firstName || !data.age || !data.address) {
    return res.status(400).json({ data: 'All fields are required' })
  }
  const employee = await prisma.employee.create({
    data: {
      ...data,
      userId: req.user.id
    }
  });
  res.status(200).json(employee)
}
const remove = async (req, res) => {
  const { id } = req.body
  try {
    await prisma.employee.delete({
      where: {
        id
      }
    });
    res.status(200).json('Done delete')
  } catch {
    res.status(400).json({ message: "Failed to delete employee" })
  }
}
const edit = async (req, res) => {
  const data = req.body
  const id = data.id
  try {
    await prisma.employee.update({
      where: {
        id
      },
      data,
    });
    res.status(200).json('Done edit')
  } catch {
    res.status(400).json('Failed to edit employee')
  }
}
const employee = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await prisma.employee.findUnique({
      where: {
        id,
      }
    })
    res.status(200).json(employee)
  } catch {
    res.status(400).json("Failed to get employee")
  }
}
module.exports = { all, add, remove, edit, employee }