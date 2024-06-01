import fastify from 'fastify';

const server = fastify();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
server.get('/ping', async (_request, _reply) => 'pong\n');

server.listen({ host: '0.0.0.0', port: 3000 }, (err, address) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
  }

  // eslint-disable-next-line no-console
  console.log(`Server listening at ${address}`);
});
