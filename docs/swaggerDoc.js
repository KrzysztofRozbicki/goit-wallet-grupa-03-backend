import swaggerJsdoc from 'swagger-jsdoc';
import { swaggerOptions } from '../utils/swaggerConfig.js';

const swaggerDocs = swaggerJsdoc(swaggerOptions);

swaggerDocs.components = {
  securitySchemes: {
    BearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },
};

swaggerDocs.paths = {
  '/api/users/register': {
    post: {
      summary: 'Register new user',
      description: 'Register new user with name, email, and password.',
      tags: ['Users'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                },
                email: {
                  type: 'string',
                },
                password: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'User registered successfully',
        },
        400: {
          description: 'Bad request',
        },
        500: {
          description: 'Internal server error',
        },
      },
    },
  },

  '/api/users/login': {
    post: {
      summary: 'Log in user',
      description: 'Log in user with email and password.',
      tags: ['Users'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: {
                  type: 'string',
                },
                password: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'User logged in successfully',
        },
        401: {
          description: 'Unauthorized',
        },
        404: {
          description: 'User not found',
        },
        500: {
          description: 'Internal server error',
        },
      },
    },
  },

  '/api/users/refresh': {
    post: {
      summary: 'Refresh user token',
      description: 'Refresh user token',
      tags: ['Users'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                refreshToken: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Token refreshed successfully',
        },
        400: {
          description: 'Bad request',
        },
        401: {
          description: 'Unauthorized',
        },
        500: {
          description: 'Internal server error',
        },
      },
      security: [
        {
          BearerAuth: [],
        },
      ],
    },
  },

  '/api/users/profile': {
    get: {
      summary: 'Get user profile',
      description: 'Get user profile information.',
      tags: ['Users'],
      responses: {
        200: {
          description: 'User profile retrieved successfully',
        },
        401: {
          description: 'Unauthorized',
        },
        404: {
          description: 'User not found',
        },
        500: {
          description: 'Internal server error',
        },
      },
      security: [
        {
          BearerAuth: [],
        },
      ],
    },
  },

  '/api/users/logout': {
    post: {
      summary: 'Log out user',
      description: 'Log out user and invalidate their tokens.',
      tags: ['Users'],
      responses: {
        200: {
          description: 'User logged out successfully',
        },
        401: {
          description: 'Unauthorized',
        },
        404: {
          description: 'User not found',
        },
        500: {
          description: 'Internal server error',
        },
      },
      security: [
        {
          BearerAuth: [],
        },
      ],
    },
  },
};

export default swaggerDocs;
