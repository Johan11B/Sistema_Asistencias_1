const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
const estudiantesRoutes = require('../../Backend/routes/estudiantesroutes');

const app = express();

// Middlewares esenciales
app.use(cors({
  origin: '*' // o especifica tus dominios permitidos ej: ['https://tusitio.com']
}));
app.use(express.json());

// Manejo explícito del router
app.use('/.netlify/functions/estudiantes', estudiantesRoutes); // Ruta base completa

// Middleware para rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({ 
    error: 'Endpoint no encontrado',
    rutaSugerida: '/.netlify/functions/estudiantes/[operacion]'
  });
});

// Manejo centralizado de errores
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

exports.handler = serverless(app);