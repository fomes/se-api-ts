import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const deleteClientRouter = Router();

deleteClientRouter.delete("/clients/del", async (req, res) => {
  const { id } = req.body;

  await prisma.clients.delete({
    where: {
      id,
    },
  });

  return res.status(201).send({ message: "Client successfuly deleted!" });
});
