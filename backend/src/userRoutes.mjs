import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAll = async (req, res) => {
  const users = await prisma.users.findMany();
  res.send(users);
};

export const login = async (req, res) => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        name: req.body.name,
      },
    });
    if (user.password === req.body.password) {
      req.session.user = {
        name: req.body.name,
        role: user.role,
        id: user.id,
      };
      res.send("logged in");
    } else res.status(400).send("login error");
  } catch (error) {
    res.status(400).send(error);
  }
};

export const logout = (req, res) => {
      req.session.user = undefined;
      res.send("logged out");
};

export const register = async (req, res) => {
  try {
    const user = await prisma.users.create({
      data: {
        ...req.body,
      },
    });
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const update = async (req, res) => {
    try {
      const updateUser = await prisma.users.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: {
          ...req.body,
        },
      });
      res.send(updateUser);
    } catch (error) {
      res.status(400).send(error);
    }
  }

export const del = async (req, res) => {
  const deleteUser = await prisma.users.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });
  res.send(deleteUser);
};
