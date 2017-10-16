/* @flow */
import React from 'react';
import type { LayoutProps } from './types';

const DefaultLayout = ({ input, label, error }: LayoutProps) => (
  <div>
    {label ? <label>{label}</label> : null}
    <div>{input}</div>
    {error ? <small>error</small> : null}
  </div>
);

// just a dummy validator for simple function based validators
class DefaultValidator {
  schema: Function;

  constructor(schema: Function) {
    this.schema = schema;
  }

  errorsFor(data: Object): ?Object {
    return this.schema(data);
  }
}

export default {
  DefaultValidator,
  defaultLayout: DefaultLayout
};
