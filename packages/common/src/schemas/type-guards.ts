import Ajv, { JSONSchemaType } from 'ajv';
import RefuelingSchema from './types/Refueling.schema.json';
import ApiV1RefuelingListRequestSchema from './api/v1/refueling/list/Request.schema.json';
import ApiV1RefuelingListResponseSchema from './api/v1/refueling/list/Response.schema.json';
import { Refueling } from '../interfaces/types/Refueling.schema';
import { ApiV1RefuelingListRequest } from '../interfaces/api/v1/refueling/list/Request.schema';

const ajv = new Ajv({
  schemaId: '$id',
  schemas: [],
  allErrors: true,
  verbose: true,
  ownProperties: true,
});

function validate<T>(schema: object, data: T): T {
  const isValid = ajv.validate(schema, data);

  if (!isValid) {
    const errorMessages = this.ajv.errorsText();
    throw new Error(`Validation Error. ${errorMessages}`);
  }

  return data;
}

// requires hack with any-type so that ajv does not complain about union type vs general string type
const refuelingSchema: JSONSchemaType<Refueling> = RefuelingSchema as any;
export const typeIsRefueling = ajv.compile(refuelingSchema);

///////////////////////////////////
//   API REQUEST/RESPONSE DATA   //
///////////////////////////////////
const apiV1RefuelingListRequestSchema: JSONSchemaType<ApiV1RefuelingListRequest> =
  ApiV1RefuelingListRequestSchema as any;
export const typeIsApiV1RefuelingListRequestSchema = ajv.compile(
  apiV1RefuelingListRequestSchema
);
const apiV1RefuelingListResponseSchema: JSONSchemaType<ApiV1RefuelingListRequest> =
  ApiV1RefuelingListResponseSchema as any;
export const typeIsApiV1RefuelingListResponseSchema = ajv.compile(
  apiV1RefuelingListResponseSchema
);
