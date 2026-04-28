import { prisma } from "../utils/prisma";
import {
  CreateUserDTO,
  LoginDTO,
  LoginResponseDTO,
} from "../models/user.model";
import {
  generateToken,
  generateHashPassword,
  validateEmail,
  generateTocken,
  sendVerificationEmail,
  sendPasswordResetEmail,
} from "../utils";
import bcrypt from "bcryptjs";
import { Role, Status } from "@prisma/client";
import {
  ACCOUNT_LOCK_DURATION_MINUTES,
  MAX_FAILED_LOGIN_ATTEMPTS,
} from "../config";
import { profileService } from "./profile.service";

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
        role: data.role || Role.ALUMNI,
        verificationToken: tockenEncript,
        verificationExpiry: tokenExpire,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        verificationExpiry: true,
      },
    });

    await sendVerificationEmail(user.email, user?.name, token,user?.id);

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

    const verifiedUser = await prisma.user.update({
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
        role: true,
        createdAt: true,
      },
    });

    await profileService.create({
      userId: verifiedUser.id,
      name: verifiedUser.name || "",
    });

    return {
      verifiedUser
    };
  },

  findAllUsers: async () => {
    return prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        status: true,
        role: true,
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

  loginUser: async (data: LoginDTO): Promise<LoginResponseDTO> => {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    if (!user.emailVerified || user.status !== Status.ACTIVE) {
      throw new Error("Please verify your email first");
    }

    if (user.role !== Role.STAFF) {
      throw new Error("Access denied. Only university staff can access the analytics dashboard.");
    }

    if (user.lockedUntil && user.lockedUntil > new Date()) {
      const remainingMinutes = Math.ceil(
        (user.lockedUntil.getTime() - Date.now()) / (60 * 1000),
      );
      throw new Error(
        `Account is locked. Please try again in ${remainingMinutes} minutes.`,
      );
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      const failedAttempts = user.failedLoginAttempts + 1;
      let lockedUntil = user.lockedUntil;

      if (failedAttempts >= MAX_FAILED_LOGIN_ATTEMPTS) {
        lockedUntil = new Date(
          Date.now() + ACCOUNT_LOCK_DURATION_MINUTES * 60 * 1000,
        );
      }

      await prisma.user.update({
        where: { id: user.id },
        data: {
          failedLoginAttempts: failedAttempts,
          lockedUntil,
        },
      });

      throw new Error("Invalid email or password");
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        failedLoginAttempts: 0,
        lockedUntil: null,
        isLoggedIn: true,
        lastLoginAt: new Date(),
      },
    });

    const token = generateToken(updatedUser.id);

    return {
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        status: updatedUser.status,
        role: updatedUser.role,
        createdAt: updatedUser.createdAt,
      },
      token,
    };
  },

  logoutUser: async (id: string) => {
    return prisma.user.update({
      where: { id },
      data: {
        isLoggedIn: false,
      },
    });
  },

  requestPasswordReset: async (email: string) => {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("User with this email does not exist");
    }

    if (user.status !== Status.ACTIVE) {
      throw new Error("Please verify your email first");
    }

    if (user.resetTokenExpiry && user.resetTokenExpiry > new Date()) {
      throw new Error("Please verify your email first");
    }

    const { token, expiresAt: tokenExpire } = generateTocken();

    const tockenEncript = await generateHashPassword(token);
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken: tockenEncript,
        resetTokenExpiry: tokenExpire,
      },
    });

    await sendPasswordResetEmail(user.email, user?.name, token, user.id);

    return {
      token,
      tokenExpire,
    };
  },

  verifyResetToken: async (id: string, token: string, password: string) => {
    const ExistingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!ExistingUser) {
      throw new Error("User not found");
    }

    if (!ExistingUser.resetToken || !ExistingUser.resetTokenExpiry) {
      throw new Error("Invalid or expired reset token");
    }

    const isTokenExpired = ExistingUser.resetTokenExpiry < new Date();

    if (isTokenExpired) {
      throw new Error("Token expired");
    }

    const isTokenValid = await bcrypt.compare(token, ExistingUser.resetToken);

    if (!isTokenValid) {
      throw new Error("Invalid token");
    }

    const passwordEncrypted = await generateHashPassword(password);

    const user = await prisma.user.update({
      where: { id },
      data: {
        password: passwordEncrypted,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    if (!user) {
      throw new Error("Invalid or expired reset token");
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      status: user.status,
      createdAt: user.createdAt,
    };
  },
};
