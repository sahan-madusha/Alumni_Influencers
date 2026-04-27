import "../config";
import { prisma } from "../utils/prisma";
import { generateHashPassword } from "../utils/generateHashPassword";
import { Role, Status } from "@prisma/client";

async function seed() {
  console.log("Starting highly diverse seeding...");
  const password = await generateHashPassword("Password123!");

  const industries = [
    "Technology", "Finance", "Healthcare", "Education", "Manufacturing", 
    "Telecommunications", "E-commerce", "Energy", "Automotive", "Aerospace"
  ];
  
  const companies = [
    "Google", "Microsoft", "Amazon", "WSO2", "IFS", "Virtusa", "Pearson", "Dialog",
    "Tesla", "SpaceX", "Apple", "Netflix", "Meta", "Oracle", "IBM", "SAP"
  ];
  
  const positions = [
    "Software Engineer", "Data Scientist", "Product Manager", "UX Designer", 
    "DevOps Engineer", "Solutions Architect", "Business Analyst", "Marketing Lead",
    "QA Automation Engineer", "Full Stack Developer", "Cloud Consultant", "Agile Coach",
    "Machine Learning Engineer", "Cybersecurity Analyst", "Database Admin", "CTO",
    "Product Owner", "Scrum Master", "Systems Administrator", "Frontend Architect"
  ];
  
  const countries = [
    "Sri Lanka", "United Kingdom", "Australia", "United States", "Singapore", 
    "Germany", "Canada", "Japan", "France", "Netherlands", "United Arab Emirates"
  ];
  
  const allSkills = [
    "AWS Certified Solutions Architect", "Professional Scrum Master (PSM I)", "Google Cloud Professional", 
    "Azure Fundamentals", "Certified Kubernetes Administrator (CKA)", "PMP Certification",
    "CompTIA Security+", "Meta Front-End Developer", "IBM Data Science", "Agile Certified Practitioner",
    "Docker Certified Associate", "Terraform Associate", "Cisco CCNA", "Salesforce Administrator",
    "React Native Expert", "TensorFlow Developer", "Certified Ethical Hacker (CEH)", "ITIL Foundation",
    "Google Analytics Individual Qualification", "Microsoft Certified: Azure Data Scientist",
    "Oracle Certified Professional", "Prince2 Foundation", "Six Sigma Green Belt", "Lean Management",
    "Tableau Desktop Specialist", "Alteryx Designer Core", "Unity Certified Developer",
    "Adobe Certified Professional", "ISTQB Foundation", "CompTIA Network+"
  ];

  for (let i = 1; i <= 60; i++) {
    const email = `alumni_ext${i}@iit.ac.lk`;
    const name = `Professional Alumni ${i}`;
    
    const createdAt = new Date();
    createdAt.setFullYear(2021 + Math.floor(Math.random() * 6));

    const numSkills = 3 + Math.floor(Math.random() * 4);
    const selectedSkills = [...allSkills]
      .sort(() => 0.5 - Math.random())
      .slice(0, numSkills);

    try {
      await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
          email,
          password,
          name,
          role: Role.ALUMNI,
          status: Status.ACTIVE,
          emailVerified: true,
          createdAt,
          profile: {
            create: {
              firstName: "Alumni",
              lastName: `Expert ${i}`,
              bio: `Seasoned professional in ${industries[i % industries.length]} with a focus on ${selectedSkills[0]}.`,
              industrySector: industries[Math.floor(Math.random() * industries.length)],
              company: companies[Math.floor(Math.random() * companies.length)],
              position: positions[Math.floor(Math.random() * positions.length)],
              country: countries[Math.floor(Math.random() * countries.length)],
              Certifications: {
                create: selectedSkills.map(skill => ({ name: skill }))
              }
            }
          }
        }
      });
      if (i % 10 === 0) console.log(`Created ${i} diverse profiles...`);
    } catch (err) {
      console.error(`Failed to create user ${email}:`, err);
    }
  }
  console.log("Highly diverse seeding completed successfully.");
}

seed()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
