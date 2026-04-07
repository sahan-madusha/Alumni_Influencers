import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Alumni Influencers API',
    description: 'Comprehensive API documentation for the Alumni Influencers API',
  },
  host: 'localhost:5000',
  basePath: '/api/v1/user',
  schemes: ['http'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
      description: 'Enter your Bearer token in the format "Bearer <token>"'
    }
  },
  security: [{ bearerAuth: [] }],
  definitions: {
    LoginDTO: {
      email: 'admin@test.com',
      password: 'password123'
    },
    RegisterDTO: {
      email: 'user@test.com',
      password: 'password123',
      name: 'John Doe'
    },
    VerifyEmailDTO: {
      id: 'uuid-here',
      token: '1234-5678'
    },
    ResetPasswordRequestDTO: {
      email: 'user@test.com'
    },
    ResetPasswordDTO: {
      id: 'uuid-here',
      token: '1234-5678',
      password: 'newPassword123'
    }
  }
};

const outputFile = './src/swagger.json';
const endpointsFiles = ['./src/index.ts', './src/routes/user.routes.ts'];

swaggerAutogen()(outputFile, endpointsFiles, doc);
