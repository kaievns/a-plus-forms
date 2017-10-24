/* @flow */
type Errors = Object | string;

export default class ValidationError extends Error {
  errors: Errors;

  constructor(errors: Errors) {
    super(JSON.stringify(errors));
    this.errors = errors;
  }
}
