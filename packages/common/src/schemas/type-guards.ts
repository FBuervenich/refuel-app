import Ajv, { JSONSchemaType } from 'ajv';
import RefuelingSchema from './types/Refueling.schema.json';
import { Refueling } from '../interfaces/types/Refueling.schema';

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
