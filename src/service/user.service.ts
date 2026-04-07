import { prisma } from "../utils/prisma";
import { CreateUserDTO } from "../models/user.model";
import { create } from "domain";
import { ALLOWED_DOMAINS } from "../config";
import { generateHashPassword } from "../utils/generateHashPassword";
import { validateEmail } from "../utils/validateEmail";

export const userService = {
  createUser: async (data: CreateUserDTO) => {
    const isValidEmail = validateEmail(data.email);
    if (!isValidEmail) {
      throw new Error("Invalid email domain");
    }

    const userExists = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userExists) {
      throw new Error("User already exists");
    }

    const passwordEncrypted = await generateHashPassword(data.password);

    return prisma.user.create({
      data: {
        email: data.email,
        password: passwordEncrypted,
        name: data.name,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  },

  findAllUsers: async () => {
    return prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        status: true,
        createdAt: true,
      },
    });
  },

  saveUser: async (data: CreateUserDTO) => {
    return prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        name: data.name,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  },

  findUserByEmail: async (email: string) => {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  },
};
