import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAll = async (req, res) => {
  const cards = await prisma.cards.findMany();
  res.send(cards);
};

export const create = async (req, res) => {
  try {
    const card = await prisma.cards.create({
      data: {
        ...req.body,
        authorId: req.session.user.id,
      },
    });
    res.send(card);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const update = async (req, res) => {
  try {
    const updateCard = await prisma.cards.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        ...req.body,
      },
    });
    res.send(updateCard);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const del = async (req, res) => {
  const deleteCard = await prisma.cards.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });
  res.send(deleteCard);
};
