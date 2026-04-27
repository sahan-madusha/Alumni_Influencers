import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Alumni Influencers API",
    description:
      "Comprehensive API documentation for the Alumni Influencers API",
  },
  host: "localhost:5000",
  basePath: "/api/v1",
  schemes: ["http"],
  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
      description: 'Enter your Bearer token in the format "Bearer <token>"',
    },
  },
  security: [{ bearerAuth: [] }],
  definitions: {
    LoginDTO: {
      email: "admin@test.com",
      password: "password123",
    },
    RegisterDTO: {
      email: "user@test.com",
      password: "password123",
      name: "John Doe",
    },
    VerifyEmailDTO: {
      id: "uuid-here",
      token: "1234-5678",
    },
    ResetPasswordRequestDTO: {
      email: "user@test.com",
    },
    ResetPasswordDTO: {
      id: "uuid-here",
      token: "1234-5678",
      password: "newPassword123",
    },
    UpdateProfileDTO: {
      firstName: "John",
      lastName: "Doe",
      bio: "Software Engineer",
      linkedin: "https://linkedin.com/in/johndoe",
    },
    DegreeDTO: {
      name: "BSc in Computer Science",
      startDate: "2020-01-01",
      endDate: "2024-01-01",
    },
    EmploymentDTO: {
      name: "Senior Developer",
      startDate: "2024-02-01",
    },
    CertificationDTO: {
      name: "AWS Solutions Architect",
      untilValide: "2027-01-01",
    },
    LicenseDTO: {
      name: "Professional Engineer",
      untilValide: "2030-01-01",
    },
  },
};

const outputFile = "./src/swagger.json";
const endpointsFiles = [
  "./src/index.ts",
  "./src/routes/user.routes.ts",
  "./src/routes/profile.routs.ts",
  "./src/routes/bid.routes.ts",
  "./src/routes/dashboard.routes.ts",
  "./src/routes/login.routs.ts",
];

swaggerAutogen()(outputFile, endpointsFiles, doc);
