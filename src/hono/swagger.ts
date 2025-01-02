import { serve } from '@hono/node-server';
import { swaggerUI } from '@hono/swagger-ui';
import { Hono } from 'hono';

const app = new Hono();

// Use the middleware to serve Swagger UI at /ui
app.get(
  '/ui',
  swaggerUI({ url: 'https://petstore3.swagger.io/api/v3/openapi.json' })
);

serve({
  fetch: app.fetch,
  port: 3000,
});
