import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { createPassword } from "../utils/auth";

const prisma = new PrismaClient();

export const postUserRouter = Router();

postUserRouter.post("/users/new", async (req, res) => {
  const { username, password } = req.body;

  const alreadyExists = await prisma.users.findFirst({
    where: {
      username,
    },
  });

  if (username.length < 3) {
    return res
      .status(400)
      .send({ error: "Username field must have at least 3 characters!" });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .send({ error: "Password field must have at least 8 characters!" });
  }

  if (alreadyExists) {
    return res.status(403).send({ error: "User already exists!" });
  } else {
    const pass = await createPassword(password);

    await prisma.users.create({
      data: {
        username,
        password: pass,
      },
    });

    return res.status(201).send({ message: "User successfuly created!" });
  }
});
