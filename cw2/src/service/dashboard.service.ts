import { prisma } from "../utils/prisma";

export const dashboardService = {
  getDashboardData: async () => {
    return await prisma.profile.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },
};
