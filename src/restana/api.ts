import restana from 'restana';

const service = restana();

service.get('/', (_req, res) => res.send('Hello World!'));

service.start(3000);
