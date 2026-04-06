import { prisma } from "../utils/prisma";

export const userModel = {
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

  saveUser: async (data: any) => {
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

