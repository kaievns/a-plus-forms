/* @flow */
import React from 'react';
import type { LayoutProps, Component } from '../types';

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
    const { props: { label, layout, ...rest }, options: { bypass = [] } } = this.props; // eslint-disable-line

    bypass.forEach((name) => { rest[name] = this.props.props[name]; });

    return rest;
  }

  layoutProps(): Object {
    const { options: { bypass = [] } } = this.props;

    return ['label']
      .filter(n => !bypass.includes(n))
      .reduce((props, name) => {
        if (name in this.props.props) {
          props[name] = (this.props.props: Object)[name];
        }

        return props;
      }, {});
  }

  render() {
    const { input: Input, options, props } = this.props;
    const input = <Input {...this.inputProps()} />;
    const Layout = 'layout' in options
      ? options.layout : 'layout' in props
      ? props.layout : DefaultLayout;

    if (!Layout) return input;

    return <Layout {...this.layoutProps()} input={input} />;
  }
}
