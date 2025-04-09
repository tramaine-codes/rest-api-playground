import awsLambdaFastify from '@fastify/aws-lambda';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import fastify from 'fastify';

const server = fastify();

server.register(swagger, {
  mode: 'static',
  specification: {
    path: './src/fastify/openapi.yaml',
    baseDir: './src/fastify',
  },
});

server.register(swaggerUi, {
  routePrefix: 'v1/docs',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: true,
  },
  theme: {
    css: [
      {
        filename: 'theme.css',
        content: '.swagger-ui .topbar { display: none !important; }',
      },
    ],
  },
  staticCSP: false,
});

export const handler = awsLambdaFastify(server);
