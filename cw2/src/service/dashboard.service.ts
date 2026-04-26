import { prisma } from "../utils/prisma";

export const dashboardService = {
  getDashboardData: async () => {
    return await prisma.profile.findMany({
      include: {
        user: true,
        Degrees: true,
        Certifications: true,
        Employments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  getAnalyticsData: async () => {
    const profiles = await prisma.profile.findMany({
      include: {
        user: true,
        Degrees: true,
        Certifications: true,
        Employments: true,
      }
    });

    // 1. Graduates by Programme
    const byProgramme: any = {};
    const graduationTrends: any = {};
    const bySector: any = {};
    const certifications: any = {};
    const topEmployers: any = {};
    const userStatus: any = { ACTIVE: 0, PENDING: 0, INACTIVE: 0 };
    const socialPresence: any = { LinkedIn: 0, Twitter: 0, GitHub: 0 };
    const registrationGrowth: any = {};

    profiles.forEach(p => {
      p.Degrees.forEach(d => {
        byProgramme[d.name] = (byProgramme[d.name] || 0) + 1;
        if (d.endDate) {
          const year = new Date(d.endDate).getFullYear();
          graduationTrends[year] = (graduationTrends[year] || 0) + 1;
        }
      });

      if (p.industrySector) {
        bySector[p.industrySector] = (bySector[p.industrySector] || 0) + 1;
      }

      p.Certifications.forEach(c => {
        certifications[c.name] = (certifications[c.name] || 0) + 1;
      });

      if (p.company) {
        topEmployers[p.company] = (topEmployers[p.company] || 0) + 1;
      }

      userStatus[p.user.status]++;

      if (p.linkedin) socialPresence.LinkedIn++;
      if (p.twitter) socialPresence.Twitter++;
      if (p.github) socialPresence.GitHub++;

      const monthYear = new Date(p.createdAt).toLocaleString('default', { month: 'short', year: 'numeric' });
      registrationGrowth[monthYear] = (registrationGrowth[monthYear] || 0) + 1;
    });

    return {
      byProgramme,
      graduationTrends,
      bySector,
      certifications,
      topEmployers,
      userStatus,
      socialPresence,
      registrationGrowth
    };
  }
};
