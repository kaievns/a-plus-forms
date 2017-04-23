/* @flow */
import Ajv from 'ajv';

type JSONSchema = {
  type: 'object' | 'array' | 'string' | 'boolean' | 'number',
  properties?: Object,
  required?: Array<string>
};

export default class Validator {
  schema: JSONSchema
  valid: Function

  constructor(schema: JSONSchema) {
    this.schema = schema;
    this.valid = new Ajv({ allErrors: true }).compile(schema);
  }

  errorsFor(data: Object): ?string {
    if (this.valid(data)) return null;

    return this.valid.errors.map(e => e.message).join(', ');
  }
}
