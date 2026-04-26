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

    const analytics = {
      skillsGap: {} as any,
      industrySector: {} as any,
      jobTitles: {} as any,
      cloudGrowth: { "2021": 0, "2022": 0, "2023": 0, "2024": 0, "2025": 0, "2026": 0 } as any,
      geographicDistribution: {} as any,
      agileScrum: { "Agile/Scrum": 0, "Other": 0 } as any,
      topEmployers: {} as any,
      careerPathways: { "Engineering": 0, "Management": 0, "Data/AI": 0, "Design": 0, "Other": 0 } as any
    };

    profiles.forEach(p => {
      p.Certifications.forEach(c => {
        analytics.skillsGap[c.name] = (analytics.skillsGap[c.name] || 0) + 1;
        
        const name = c.name.toLowerCase();
        if (name.includes('cloud') || name.includes('aws') || name.includes('azure') || name.includes('gcp')) {
          const year = p.createdAt.getFullYear().toString();
          if (analytics.cloudGrowth[year] !== undefined) {
            analytics.cloudGrowth[year]++;
          }
        }

        if (name.includes('agile') || name.includes('scrum')) {
          analytics.agileScrum["Agile/Scrum"]++;
        } else {
          analytics.agileScrum["Other"]++;
        }
      });

      if (p.industrySector) {
        analytics.industrySector[p.industrySector] = (analytics.industrySector[p.industrySector] || 0) + 1;
      }

      if (p.position) {
        analytics.jobTitles[p.position] = (analytics.jobTitles[p.position] || 0) + 1;
        
        const pos = p.position.toLowerCase();
        if (pos.includes('engineer') || pos.includes('developer') || pos.includes('architect')) analytics.careerPathways["Engineering"]++;
        else if (pos.includes('manager') || pos.includes('lead') || pos.includes('director')) analytics.careerPathways["Management"]++;
        else if (pos.includes('data') || pos.includes('ai') || pos.includes('ml')) analytics.careerPathways["Data/AI"]++;
        else if (pos.includes('design') || pos.includes('ux') || pos.includes('ui')) analytics.careerPathways["Design"]++;
        else analytics.careerPathways["Other"]++;
      }

      if (p.country) {
        analytics.geographicDistribution[p.country] = (analytics.geographicDistribution[p.country] || 0) + 1;
      }

      if (p.company) {
        analytics.topEmployers[p.company] = (analytics.topEmployers[p.company] || 0) + 1;
      }
    });

    analytics.jobTitles = Object.fromEntries(Object.entries(analytics.jobTitles).sort((a, b) => (b[1] as any) - (a[1] as any)).slice(0, 5));
    analytics.topEmployers = Object.fromEntries(Object.entries(analytics.topEmployers).sort((a, b) => (b[1] as any) - (a[1] as any)).slice(0, 5));
    analytics.skillsGap = Object.fromEntries(Object.entries(analytics.skillsGap).sort((a, b) => (b[1] as any) - (a[1] as any)).slice(0, 15));

    return analytics;
  }
};
