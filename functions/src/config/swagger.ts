import swaggereJsdoc from 'swagger-jsdoc';

const options: swaggereJsdoc.Options = {
  swaggerDefinition: {
    info: {
      title: 'Music shorts',
      version: '0.0.1',
      description: 'Music shorts app & admin apis with express',
    },
    host: 'https://us-central1-music-shorts.cloudfunctions.net',
    basePath: '/api',
  },
  apis: [__dirname + '/../routes/**/*.js'],
};

export const specs = swaggereJsdoc(options);
