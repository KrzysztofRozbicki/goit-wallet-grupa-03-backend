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

  '/api/transactions': {
    get: {
      summary: 'List of all transactions for authenticated User',
      description: 'Get list of all User transactions',
      tags: ['Transactions'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        200: {
          description: 'Success',
        },
        401: {
          description: 'Unauthorized',
        },
        500: {
          description: 'Internal server error',
        },
      },
    },

    post: {
      summary: 'Create new transaction',
      description: 'Add new transaction with required fields.',
      tags: ['Transactions'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                isIncome: {
                  type: 'boolean',
                },
                date: {
                  type: 'string',
                },
                category: {
                  type: 'string',
                },
                amount: {
                  type: 'number',
                },
                comment: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Created',
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
    },
  },

  '/api/transactions/{id}': {
    patch: {
      tags: ['Transactions'],
      summary: 'Update transaction by ID',
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID of transaction to update',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                isIncome: {
                  type: 'boolean',
                },
                date: {
                  type: 'string',
                },
                category: {
                  type: 'string',
                },
                amount: {
                  type: 'number',
                },
                comment: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Success',
        },
        401: {
          description: 'Unauthorized',
        },
        404: {
          description: 'Not found',
        },
        500: {
          description: 'Internal server error',
        },
      },
    },

    delete: {
      summary: 'Delete transaction by ID',
      description: 'Deleting transaction with specific ID',
      tags: ['Transactions'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID of transaction to delete',
        },
      ],
      responses: {
        200: {
          description: 'Success',
        },
        401: {
          description: 'Unauthorized',
        },
        404: {
          description: 'Not found',
        },
        500: {
          description: 'Internal server error',
        },
      },
    },
  },

  '/api/transactions/{month}/{year}': {
    get: {
      summary: 'Filter transactions',
      description: 'Filtering transaction by month and year',
      tags: ['Transactions'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: 'month',
          in: 'path',
          required: true,
          description: 'Month to filter by (MM)',
        },
        {
          name: 'year',
          in: 'path',
          required: true,
          description: 'Year to filter by (YYYY)',
        },
      ],
      responses: {
        200: {
          description: 'Success',
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
    },
  },

  '/api/transactions/categories/totals': {
    get: {
      summary:
        'Get total income, total expenses, balance, and sums for each category of transactions',
      description: 'Preparation of user balance',
      tags: ['Transactions'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        200: {
          description: 'Success',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  totalIncome: {
                    type: 'number',
                  },
                  totalExpenses: {
                    type: 'number',
                  },
                  balance: {
                    type: 'number',
                  },
                  totalExpensesByCategories: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        category: {
                          type: 'string',
                        },
                        total: {
                          type: 'number',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        401: {
          description: 'Unauthorized',
        },
        500: {
          description: 'Internal server error',
        },
      },
    },
  },
};

export default swaggerDocs;
