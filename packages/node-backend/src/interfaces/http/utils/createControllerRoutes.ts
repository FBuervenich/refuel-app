import path from 'path';
import { RestController } from '../../types';

export default function createControllerRoutes(controller: RestController) {
  return controller.router;
}
