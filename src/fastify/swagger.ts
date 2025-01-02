/* eslint-disable @typescript-eslint/no-unused-vars */
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import fastify from 'fastify';

const server = fastify();

server.addSchema({
  $id: 'user',
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
  },
});

server.register(swagger, {
  swagger: {
    info: {
      title: 'API Documentation',
      description: 'API documentation using Swagger/OpenAPI 3.0',
      version: '1.0.0',
    },
    host: 'localhost',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [{ name: 'user', description: 'User related end-points' }],
    paths: {
      '/users': {
        get: {
          tags: ['users'],
          summary: 'Get all users',
          description: 'Return a list of users',
          responses: {
            200: {
              description: 'A list of users',
              schema: {
                type: 'array',
                // $ref: 'user',
                items: {
                  type: 'array',
                  // pr
                  $ref: 'user',
                },
              },
            },
          },
        },
      },
    },
  },
});

server.register(swaggerUi, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: false,
  },
  uiHooks: {
    onRequest: function (_request, _reply, next) {
      next();
    },
    preHandler: function (_request, _reply, next) {
      next();
    },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
});

server.route({
  method: 'GET',
  url: '/users',
  handler: async (_request, _reply) => [
    { id: '1', name: 'John Doe', email: 'john@example.com' },
  ],
});

server.listen({ host: '0.0.0.0', port: 3000 }, (err, address) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
  }

  // eslint-disable-next-line no-console
  console.log(`Server listening at ${address}`);
});
