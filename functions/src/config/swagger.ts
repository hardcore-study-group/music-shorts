import YAML from 'yamljs';
import path from 'path';
import {SwaggerOptions} from 'swagger-ui-express';

export const specs = YAML.load(
  path.join(__dirname, '../../swagger.yaml'),
) as SwaggerOptions;
