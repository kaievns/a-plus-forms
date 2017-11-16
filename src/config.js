/* @flow */
import React from 'react';
import type { LayoutProps } from './types';

const DefaultLayout = ({ input, label, error }: LayoutProps) => (
  <div>
    {label ? <label>{label}</label> : null}
    <div>{input}</div>
    {error ? <small>{error}</small> : null}
  </div>
);

// just a dummy validator for simple function based validators
class DefaultValidator {
  schema: ?Function;

  constructor(schema: ?Function) {
    this.schema = schema;
  }

  errorsFor(data: Object): ?Object {
    return this.schema && this.schema(data);
  }
}

// default form layout
const FormLayout = ({ error, input }: LayoutProps) =>
  React.cloneElement(input, {
    error: error && <small className="error">{error}</small>
  });

export default {
  DefaultValidator,
  formLayout: FormLayout,
  defaultLayout: DefaultLayout
};
