import { CreateProfileDTO } from "../models";
import { prisma } from "../utils/prisma";

export const profileService = {
  create: async (data: CreateProfileDTO) => {
    return prisma.profile.create({
      data: {
        userId: data.userId,
        firstName: data.name,
      },
    });
  },
  getProfile: async (userId: string) => {
    return prisma.profile.findUnique({
      where: {
        userId,
      },
    });
  },
};
