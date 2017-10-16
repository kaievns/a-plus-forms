/* @flow */
import React from 'react';
import PropTypes from 'prop-types';
import type { Component, FieldProps } from '../types';
import config from '../config';

type HandlerProps = {
  input: Component,
  layout: Component | null | false,
  props: FieldProps
};

/**
 * This is the actual layout strategy component
 */
export default class LayoutHandler extends React.Component<HandlerProps> {
  static contextTypes = {
    APFLayout: PropTypes.any
  };

  /**
   * Calculates the actual Input props
   * an input receives all the props except the layout ones
   */
  inputProps(): Object {
    const { props: { label, layout, ...rest } } = this.props; // eslint-disable-line
    return rest;
  }

  /**
   * Calculates the actual layout props
   * a layout receives all the same props except id/className
   * the class name goes into the input field by default
   */
  layoutProps(): Object {
    const { props: { id, className, ...rest } } = this.props; // eslint-disable-line
    return rest;
  }

  // selects the right layout
  chooseLayout(): ?Component {
    const { layout, props } = this.props;
    const { APFLayout } = this.context;

    if ('layout' in props) {
      return props.layout || null; // individual props layout
    } else if (layout !== undefined) {
      return layout || null; // the field options layout
    } else if (APFLayout) {
      return APFLayout; // the context layout
    }

    return config.defaultLayout;
  }

  render() {
    const { input: Input } = this.props;
    const input = <Input {...this.inputProps()} />;
    const Layout = this.chooseLayout();

    if (!Layout) return input;

    return <Layout {...this.layoutProps()} input={input} />;
  }
}
