// src/app.ts

import express from 'express';
import swaggerUi from 'swagger-ui-express';
import crudRoutes from './crud/crud.routes';
import { swaggerDocument } from './swagger/swagger.config';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar Swagger UI
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'API Documentation - Gestión de Proyectos',
  })
);

// Endpoint para obtener el JSON de Swagger
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDocument);
});

// Rutas de la API
app.use('/api/v1', crudRoutes);

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({
    message: 'API de Gestión de Proyectos',
    version: '1.0.0',
    documentation: '/api-docs',
    endpoints: {
      people: '/api/v1/people',
      projects: '/api/v1/projects',
      tasks: '/api/v1/tasks',
    },
  });
});

export default app;