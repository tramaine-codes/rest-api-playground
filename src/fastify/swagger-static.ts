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
  routePrefix: '/docs',
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

server.listen({ host: '0.0.0.0', port: 3000 }, (err, address) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
  }

  // eslint-disable-next-line no-console
  console.log(`Server listening at ${address}`);
});
