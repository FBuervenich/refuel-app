import { RestController } from '../../types';

export default function createControllerRoutes(controller: RestController) {
  return controller.router;
}
