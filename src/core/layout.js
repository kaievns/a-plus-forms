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

/**
 * Handles the layouting part of the fields
 */
export default class extends React.Component {
  inputProps(): Object {
    const { props: { label, layout, ...rest } } = this.props; // eslint-disable-line
    return rest;
  }

  layoutProps(): Object {
    return ['label']
      .reduce((props, name) => {
        if (name in this.props.props) {
          props[name] = (this.props.props: Object)[name];
        }

        return props;
      }, {});
  }

  props: {
    input: Component,
    layout: ?Component | false,
    props: FieldProps
  }

  render() {
    const { input: Input, props, layout } = this.props;
    const input = <Input {...this.inputProps()} />;
    const Layout = layout !== undefined
      ? layout : 'layout' in props
      ? props.layout : DefaultLayout;

    if (!Layout) return input;

    return <Layout {...this.layoutProps()} input={input} />;
  }
}
