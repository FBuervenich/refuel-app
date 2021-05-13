import { Context as InfraContext } from '../../../infra/contexts';
import { ErrorParameters, IBaseError, IInfraError } from './types';

export type IErrorFactory<E extends IBaseError> = (
  ctor,
  details: ErrorParameters
) => IBaseError;

export type InfraErrorParameters = { context: string } & ErrorParameters;

export function infraErrorFactory(
  context: InfraContext
): IErrorFactory<IInfraError> {
  return (ctor, details: InfraErrorParameters) => {
    const error = new ctor(details);
    const message = error.logMessage();
    console.error(message);
    return error;
  };
}
