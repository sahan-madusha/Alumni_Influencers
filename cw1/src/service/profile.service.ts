import { CreateProfileDTO, UpdateProfileDTO } from "../models";
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
      include: {
        user: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    });
  },

  updateProfile: async (userId: string, data: UpdateProfileDTO) => {
    return prisma.profile.update({
      where: {
        userId,
      },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        bio: data.bio,
        phone: data.phone,
        company: data.company,
        position: data.position,
        linkedin: data.linkedin,
        twitter: data.twitter,
        github: data.github,
        profilePicture: data.profilePicture,
      },
    });
  },

  updateProfilePicture: async (userId: string, fileName: string) => {
    return prisma.profile.update({
      where: {
        userId,
      },
      data: {
        profilePicture: fileName,
      },
    });
  },
};
