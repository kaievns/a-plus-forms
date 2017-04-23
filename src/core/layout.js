/* @flow */
import React from 'react';

type LayoutProps = {
  input: any,
  label?: string,
  error?: string
};

export default ({ input, label, error }: LayoutProps) =>
  <div>
    {label ? <label>{label}</label> : null}
    <div>{input}</div>
    {error ? <small>error</small> : null}
  </div>;
