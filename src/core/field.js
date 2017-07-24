/* @flow */
import React from 'react';
import state from './state';
import DefaultLayout from './layout';
import type { FieldProps, FieldOptions, Component } from '../types';

let fieldsCounter = 0;

export default (options: FieldOptions = {}) => (Input: Component): Component => {
  @state()
  class Field extends React.Component {
    static defaultProps = {
      layout: DefaultLayout
    }

    inputProps(): Object {
      const { label, layout, ...rest } = this.props; // eslint-disable-line
      const { bypass = [] } = options;

      bypass.forEach((name) => { rest[name] = this.props[name]; });

      return rest;
    }

    layoutProps(): Object {
      const { bypass = [] } = options;

      return ['label']
        .filter(n => !bypass.includes(n))
        .reduce((props, name) => {
          if (name in this.props) {
            props[name] = (this.props: Object)[name];
          }

          return props;
        }, {});
    }

    props: FieldProps

    render() {
      const input = <Input {...this.inputProps()} />;
      const Layout = 'layout' in options ? options.layout : this.props.layout;

      if (!Layout) return input;

      return <Layout {...this.layoutProps()} input={input} />;
    }
  }

  return Field;
};
