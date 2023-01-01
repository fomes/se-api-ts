import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const deleteClientRouter = Router();

deleteClientRouter.delete("/clients/del", async (req, res) => {
  const { cpf } = req.body;

  await prisma.clients.delete({
    where: {
      cpf,
    },
  });

  return res.status(201).send({ message: "Client successfuly deleted!" });
});
