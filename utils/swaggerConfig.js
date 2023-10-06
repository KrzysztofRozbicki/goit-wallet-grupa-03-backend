import dotenv from 'dotenv';
dotenv.config();

// ------------------WAŻNE - START------------------------------ //

//  ZMIENIAMY URL W ZALEŻNOŚCI GDZIE TESTUJEMY //
// const URL = 'http://localhost:3000';
const URL = process.env.SERVER_ADDRESS;

// ------------------WAŻNE - END ------------------------------ //

export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Quick Bucks Wallet API',
      version: '1.0.0',
      description: 'API documentation for My Wallet app',
    },
    servers: [
      {
        url: URL,
        description: 'Development server',
      },
    ],
  },
  apis: ['../routes/api/*.js', '../controllers/*.js'],
};
