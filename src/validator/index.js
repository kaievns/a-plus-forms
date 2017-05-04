/* @flow */
import Ajv from 'ajv';
import humanize from './humanizer';

type JSONSchema = {
  type: 'object' | 'array' | 'string' | 'boolean' | 'number',
  properties?: Object,
  required?: Array<string>
};

const EMPTY_SCHEMA = { type: 'object' };

export default class Validator {
  schema: JSONSchema
  valid: Function

  customValidator = () => {}

  constructor(schema: JSONSchema = EMPTY_SCHEMA) {
    this.schema = schema;
    this.valid = new Ajv({ allErrors: true }).compile(schema);
  }

  update({ validate }: { validate: Function }) {
    this.customValidator = validate;
  }

  errorsFor(data: Object): ?string {
    const customErrors = this.customValidator(data);
    const schemaErrors = this.valid(data) ? null : humanize(this.valid.errors);

    return customErrors || schemaErrors ? { ...schemaErrors, ...customErrors } : null;
  }
}
