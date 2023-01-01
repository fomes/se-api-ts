import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const editClientsRouter = Router();

editClientsRouter.put("/clients/edit", async (req, res) => {
  const { name, cpf, email, phone, address } = req.body;

  await prisma.clients.update({
    where: {
      cpf,
    },
    data: {
      name,
      cpf,
      email,
      phone,
      address,
    },
  });

  return res.status(201).send({ message: "Client successfuly edited!" });
});
