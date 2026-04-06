// No .env used. All configurations are hardcoded here.

export const config = {
  PORT: 8000,
  JWT_SECRET: "my-alternative-super-secret-key-12345",
  DATABASE_URL: "file:./dev.db", // Must match the prisma schema URL
};
