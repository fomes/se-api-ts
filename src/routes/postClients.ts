import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const postClientsRouter = Router();

postClientsRouter.post("/clients/new", async (req, res) => {
  const { name, cpf, email, phone, address } = req.body;

  const alreadyExists = await prisma.clients.findFirst({
    where: {
      cpf,
    },
  });

  if (alreadyExists) {
    return res.status(403).send({ error: "CPF already exists!" });
  } else {
    await prisma.clients.create({
      data: {
        name,
        cpf,
        email,
        phone,
        address,
      },
    });
  }

  return res.status(201).send({ message: "Client successfuly created!" });
});
