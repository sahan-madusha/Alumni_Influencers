import "../config";
import { prisma } from "../utils/prisma";
import { generateHashPassword } from "../utils/generateHashPassword";
import { Role, Status } from "@prisma/client";

async function seed() {
  console.log("Starting rich seeding...");
  const password = await generateHashPassword("Password123!");

  const industries = ["Technology", "Finance", "Healthcare", "Education", "Manufacturing", "Telecommunications"];
  const companies = ["Google", "Microsoft", "Amazon", "WSO2", "IFS", "Virtusa", "Pearson", "Dialog"];
  const positions = [
    "Software Engineer", "Data Scientist", "Product Manager", "UX Designer", 
    "DevOps Engineer", "Solutions Architect", "Business Analyst", "Marketing Lead",
    "QA Automation Engineer", "Full Stack Developer", "Cloud Consultant", "Agile Coach"
  ];
  const countries = ["Sri Lanka", "United Kingdom", "Australia", "United States", "Singapore", "Germany", "Canada"];
  const certifications = [
    "AWS Certified Solutions Architect", "Professional Scrum Master (PSM I)", "Google Cloud Professional", 
    "Azure Fundamentals", "Certified Kubernetes Administrator (CKA)", "PMP Certification",
    "CompTIA Security+", "Meta Front-End Developer", "IBM Data Science", "Agile Certified Practitioner"
  ];

  for (let i = 1; i <= 50; i++) {
    const email = `alumni${i}@iit.ac.lk`;
    const name = `Alumni ${i}`;
    
    // Randomize some dates for cloud growth chart
    const createdAt = new Date();
    createdAt.setFullYear(2021 + Math.floor(Math.random() * 6)); // 2021 to 2026

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
              lastName: `${i}`,
              bio: `Expert in ${industries[i % industries.length]} with experience in ${positions[i % positions.length]}.`,
              industrySector: industries[i % industries.length],
              company: companies[i % companies.length],
              position: positions[i % positions.length],
              country: countries[i % countries.length],
              Certifications: {
                create: [
                  { name: certifications[i % certifications.length] },
                  { name: certifications[(i + 5) % certifications.length] }
                ]
              }
            }
          }
        }
      });
      if (i % 10 === 0) console.log(`Created ${i} users...`);
    } catch (err) {
      console.error(`Failed to create user ${email}:`, err);
    }
  }
  console.log("Rich seeding completed successfully.");
}

seed()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
