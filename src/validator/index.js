/* @flow */
import Ajv from 'ajv';
import humanize from './humanizer';
import type { JSONSchema } from '../types';

const EMPTY_SCHEMA = { type: 'object' };

export default class Validator {
  schema: JSONSchema;
  valid: Function;

  customValidator = (arg: Object) => null; // eslint-disable-line

  constructor(schema: JSONSchema = EMPTY_SCHEMA) {
    this.update({ validate: () => {}, schema });
  }

  update({ validate, schema }: { validate: Function, schema?: JSONSchema }) {
    this.customValidator = validate;

    if (schema) {
      this.schema = schema;
      this.valid = new Ajv({ allErrors: true }).compile(schema);
    } else {
      this.valid = () => true;
    }
  }

  errorsFor(data: Object): ?Object {
    const customErrors = this.customValidator(data);
    const schemaErrors = this.valid(data) ? null : humanize(this.valid.errors);

    return customErrors || schemaErrors ? { ...schemaErrors, ...customErrors } : null;
  }
}
