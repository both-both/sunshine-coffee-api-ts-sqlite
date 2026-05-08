import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => {
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  res.json({
    name: 'Sunshine Coffee API',
    endpoints: {
      products: `${baseUrl}/api/products`,
      testemonies: `${baseUrl}/api/testemonies`,
      users: `${baseUrl}/api/users`,
      auth: `${baseUrl}/api/auth`,
    },
  });
});

export const homeRoutes = routes;
