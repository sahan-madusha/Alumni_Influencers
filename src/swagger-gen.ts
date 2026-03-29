import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "alumni-influencers.lk API",
    description: "API Documentation for alumni-influencers",
  },
  host: "localhost:5000",
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
    LoginRequest: {
      $email: "admin@example.com",
      $password: "password123",
    },
    ApiResponse: {
      success: true,
      statusCode: 200,
      message: "Operation successful",
      data: {},
    },
  },
};

const outputFile = "./src/swagger_output.json";
const routes = ["./src/index.ts"];

swaggerAutogen()(outputFile, routes, doc);
