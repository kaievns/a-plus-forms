/* @flow */
/* eslint no-nested-ternary: off */
import React from 'react';
import type { LayoutProps, Component, FieldProps } from '../types';

const DefaultLayout = ({ input, label, error }: LayoutProps) =>
  <div>
    {label ? <label>{label}</label> : null}
    <div>{input}</div>
    {error ? <small>error</small> : null}
  </div>;

// calculates the actual Input props
const inputProps = (props: FieldProps): Object => {
  const { label, layout, ...rest } = props; // eslint-disable-line
  return rest;
};

// calculates the actual layout props
const layoutProps = (props: FieldProps): Object => (
  { label: props.label }
);

// selects the right layout
const chooseLayout = (props: FieldProps, layout: Component | null | false): ?Component => {
  const Layout = layout !== undefined
    ? layout : 'layout' in props
    ? props.layout : DefaultLayout;

  return Layout || null;
};

/**
 * Handles the layouting part of the fields
 */
export default class extends React.Component {
  props: {
    input: Component,
    layout: Component | null | false,
    props: FieldProps
  }

  render() {
    const { input: Input, props, layout } = this.props;
    const input = <Input {...inputProps(props)} />;
    const Layout = chooseLayout(props, layout);

    if (!Layout) return input;

    return <Layout {...layoutProps(props)} input={input} />;
  }
}
