import { IInfraError } from '../errors/types';
import { BaseError } from '../errors/BaseError';
import { InfraErrorParameters } from './utils';

export abstract class BaseModuleError extends BaseError implements IInfraError {
  readonly name = 'InfraError';
  readonly context: string;
  constructor(details: InfraErrorParameters) {
    super(details);
    this.context = details.context;
  }

  toJSON() {
    return {
      modcontextule: this.context,
      ...super.toJSON(),
    };
  }

  get message(): string {
    return `${this.context}/${this.code}`;
  }
}
