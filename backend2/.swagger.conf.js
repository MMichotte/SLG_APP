const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'SLG-APP api',
    version: '1.0.0',
    description:
      'This description needs to be updated!'
  }
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ['./routes/*.js']
};

export default swaggerOptions;
