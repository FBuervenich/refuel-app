import { Json, JsonObject } from '../json/types';

/** An error appearing in a sequelize repository */
export interface RepositoryError {
  message: string;
  details: Json;
}

/** A generic error base type. */
export interface IBaseError {
  readonly name: string;

  /** A UUID that identifies the _source location_ of a specific error */
  readonly source: string;

  /**
   * A UUID that identifies the _log file location_ of a specific error occurance.
   * Separated by "." (instead of "-") to avoid confusion with source location IDs.
   */
  readonly instanceId: string;

  /** The developer-friendly, slash separated error code (without module prefix) */
  readonly code: string;

  /** Additional details */
  readonly payload: JsonObject;

  /** Additional details that should not be exposed to clients, but may be logged. */
  readonly hiddenPayload: JsonObject;

  logMessage(): string;
  toJSON(): JsonObject;
}

export interface ErrorParameters {
  readonly source: string;
  readonly code: string;
  readonly payload?: JsonObject;
  readonly hiddenPayload?: JsonObject;
}

export interface IAppError extends IBaseError {
  readonly name: 'AppError';
}

export interface IDomainError extends IBaseError {
  readonly name: 'DomainError';
}

export interface IInfraError extends IBaseError {
  readonly name: 'InfraError';
}

export interface IInterfaceError extends IBaseError {
  readonly name: 'InfraError';

  readonly context: string;
}
