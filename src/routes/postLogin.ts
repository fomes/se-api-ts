import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { validatePassord } from "../utils/auth";

const prisma = new PrismaClient();

export const postLoginRouter = Router();

postLoginRouter.post("/users/login", async (req, res) => {
  const { username, password } = req.body;

  const matchUser = await prisma.users.findFirst({
    where: {
      username,
    },
  });

  if (matchUser) {
    const hashPassword = await prisma.users.findFirst({
      select: {
        password: true,
      },

      where: {
        username,
      },
    });

    if (hashPassword) {
      const matchPassword = await validatePassord(
        password,
        String(hashPassword.password)
      );

      if (matchPassword) {
        return res.status(200).send({ auth: true });
      } else {
        return res.status(400).send({ error: "Incorrect password!" });
      }
    }
  } else {
    return res.status(400).send({ error: "User not found!" });
  }
});
