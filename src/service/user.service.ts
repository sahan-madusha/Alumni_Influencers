import { prisma } from "../utils/prisma";
import { CreateUserDTO } from "../models/user.model";
import { generateHashPassword } from "../utils/generateHashPassword";
import { validateEmail } from "../utils/validateEmail";
import { generateTocken } from "../utils/tockenGenerator";
import bcrypt from "bcryptjs";
import { Status } from "@prisma/client";

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

    const { token, expiresAt: tokenExpire } = generateTocken();

    const tockenEncript = await generateHashPassword(token);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: passwordEncrypted,
        name: data.name,
        verificationToken: tockenEncript,
        verificationExpiry: tokenExpire,
      },
      select: {
        id: true,
        email: true,
        name: true,
        verificationExpiry: true,
      },
    });

    return {
      ...user,
      verificationToken: token,
    };
  },

  verifyEmail: async (id: string, token: string) => {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user || !user?.verificationExpiry || !user?.verificationToken) {
      throw new Error("User not found");
    }

    const isTokenExpired = user.verificationExpiry < new Date();

    if (isTokenExpired) {
      throw new Error("Token expired");
    }

    const isTokenValid = await bcrypt.compare(token, user.verificationToken);

    if (!isTokenValid) {
      throw new Error("Invalid token");
    }

    return prisma.user.update({
      where: {
        id,
      },
      data: {
        status: Status.ACTIVE,
        emailVerified: true,
        verificationToken: null,
        verificationExpiry: null,
      },
      select: {
        id: true,
        email: true,
        name: true,
        status: true,
        createdAt: true,
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
