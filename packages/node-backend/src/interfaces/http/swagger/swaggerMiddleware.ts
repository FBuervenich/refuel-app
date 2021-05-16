import SwaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

export default [SwaggerUi.serve, SwaggerUi.setup(swaggerDocument)];
