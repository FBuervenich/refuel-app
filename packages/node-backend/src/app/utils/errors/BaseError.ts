import { v4 as uuid } from 'uuid';
import { JsonObject } from '../json/types';
import { IBaseError, ErrorParameters } from '../errors/types';

export abstract class BaseError extends Error implements IBaseError {
  readonly code: string;
  readonly source: string;
  readonly instanceId: string;
  readonly payload: JsonObject;
  readonly hiddenPayload: JsonObject;

  constructor(details: ErrorParameters) {
    super(`${details.code}`);
    const { source, code, payload, hiddenPayload } = details;
    this.source = source;
    this.code = code;
    this.instanceId = uuid().replace(/-/g, '.');
    this.payload = payload ?? {};
    this.hiddenPayload = hiddenPayload ?? {};
  }

  logMessage(): string {
    const { source, code, instanceId, payload, hiddenPayload } = this;
    const jsonPayload = JSON.stringify(payload ?? {});
    const jsonHiddenPayload = JSON.stringify(hiddenPayload ?? {});
    const logDetails = [
      `source=${source}`,
      `instanceId=${instanceId}`,
      `payload=${jsonPayload}`,
      `hiddenPayload=${jsonHiddenPayload}`,
    ].join(', ');
    return `Error ${instanceId}: ${code} (${logDetails})`;
  }

  toJSON(): JsonObject {
    const { message, source, code, instanceId, payload } = this;
    return {
      message,
      code,
      source,
      instanceId,
      payload,
    };
  }

  get message(): string {
    return this.code;
  }
}
