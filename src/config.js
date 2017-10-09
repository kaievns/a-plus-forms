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

export default {
  defaultLayout: DefaultLayout
};
