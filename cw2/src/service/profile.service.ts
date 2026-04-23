import {
  CertificationDTO,
  CreateProfileDTO,
  DegreeDTO,
  EmploymentDTO,
  LicenseDTO,
  UpdateProfileDTO,
} from "../models";
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
        Degrees: true,
        Employments: true,
        Certifications: true,
        Licenses: true,
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

  addDegree: async (userId: string, data: DegreeDTO) => {
    const profile = await prisma.profile.findUnique({ where: { userId } });
    if (!profile) throw new Error("Profile not found");
    return prisma.degree.create({
      data: {
        name: data.name,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : undefined,
        profileId: profile.id,
      },
    });
  },

  updateDegree: async (
    userId: string,
    id: string,
    data: Partial<DegreeDTO>,
  ) => {
    const degree = await prisma.degree.findFirst({
      where: { id, profile: { userId } },
    });
    if (!degree) throw new Error("Degree not found or unauthorized");
    return prisma.degree.update({
      where: { id },
      data: {
        name: data.name,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
      },
    });
  },

  deleteDegree: async (userId: string, id: string) => {
    const degree = await prisma.degree.findFirst({
      where: { id, profile: { userId } },
    });
    if (!degree) throw new Error("Degree not found or unauthorized");
    return prisma.degree.delete({ where: { id } });
  },

  addEmployment: async (userId: string, data: EmploymentDTO) => {
    const profile = await prisma.profile.findUnique({ where: { userId } });
    if (!profile) throw new Error("Profile not found");
    return prisma.employment.create({
      data: {
        name: data.name,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : undefined,
        profileId: profile.id,
      },
    });
  },

  updateEmployment: async (
    userId: string,
    id: string,
    data: Partial<EmploymentDTO>,
  ) => {
    const employment = await prisma.employment.findFirst({
      where: { id, profile: { userId } },
    });
    if (!employment) throw new Error("Employment not found or unauthorized");
    return prisma.employment.update({
      where: { id },
      data: {
        name: data.name,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
      },
    });
  },

  deleteEmployment: async (userId: string, id: string) => {
    const employment = await prisma.employment.findFirst({
      where: { id, profile: { userId } },
    });
    if (!employment) throw new Error("Employment not found or unauthorized");
    return prisma.employment.delete({ where: { id } });
  },

  addCertification: async (userId: string, data: CertificationDTO) => {
    const profile = await prisma.profile.findUnique({ where: { userId } });
    if (!profile) throw new Error("Profile not found");
    return prisma.certification.create({
      data: {
        name: data.name,
        untilValide: data.untilValide ? new Date(data.untilValide) : undefined,
        profileId: profile.id,
      },
    });
  },

  updateCertification: async (
    userId: string,
    id: string,
    data: Partial<CertificationDTO>,
  ) => {
    const certification = await prisma.certification.findFirst({
      where: { id, profile: { userId } },
    });
    if (!certification)
      throw new Error("Certification not found or unauthorized");
    return prisma.certification.update({
      where: { id },
      data: {
        name: data.name,
        untilValide: data.untilValide ? new Date(data.untilValide) : undefined,
      },
    });
  },

  deleteCertification: async (userId: string, id: string) => {
    const certification = await prisma.certification.findFirst({
      where: { id, profile: { userId } },
    });
    if (!certification)
      throw new Error("Certification not found or unauthorized");
    return prisma.certification.delete({ where: { id } });
  },

  addLicense: async (userId: string, data: LicenseDTO) => {
    const profile = await prisma.profile.findUnique({ where: { userId } });
    if (!profile) throw new Error("Profile not found");
    return prisma.license.create({
      data: {
        name: data.name,
        untilValide: data.untilValide ? new Date(data.untilValide) : undefined,
        profileId: profile.id,
      },
    });
  },

  updateLicense: async (
    userId: string,
    id: string,
    data: Partial<LicenseDTO>,
  ) => {
    const license = await prisma.license.findFirst({
      where: { id, profile: { userId } },
    });
    if (!license) throw new Error("License not found or unauthorized");
    return prisma.license.update({
      where: { id },
      data: {
        name: data.name,
        untilValide: data.untilValide ? new Date(data.untilValide) : undefined,
      },
    });
  },

  deleteLicense: async (userId: string, id: string) => {
    const license = await prisma.license.findFirst({
      where: { id, profile: { userId } },
    });
    if (!license) throw new Error("License not found or unauthorized");
    return prisma.license.delete({ where: { id } });
  },
};
