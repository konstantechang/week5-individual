const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Meta API',
        description: 'week5 API',

    },
    host: 'cryptic-forest-61729.herokuapp.com',
    schemes: ['https'],
};

//output file   jason檔的名字
const outputFile = './swagger-output.json';

const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
