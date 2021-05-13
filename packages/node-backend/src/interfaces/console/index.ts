process.env.NODE_ENV = process.env.NODE_ENV || 'development';

import * as Console from './Console';
import * as container from '../../container';

Console.start({
  expose: { container },
});
