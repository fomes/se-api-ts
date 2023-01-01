import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getClientsRouter = Router();

getClientsRouter.get("/clients", async (req, res) => {
  const clients = await prisma.clients.findMany({
    select: {
      name: true,
      cpf: true,
      email: true,
      phone: true,
      address: true,
    },
  });

  res.status(200).send({ clients });
});
