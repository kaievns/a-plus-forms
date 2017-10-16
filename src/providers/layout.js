/* @flow */
import React from 'react';
import PropTypes from 'prop-types';
import type { Component } from '../types';

type ProviderProps = {
  layout: Component,
  children: PropTypes.element
};

/**
 * This is the standard interface to feed different field
 * layouts into the forms in different contexts
 */
export default class LayoutProvider extends React.Component<ProviderProps> {
  static childContextTypes = {
    APFLayout: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired
  };

  getChildContext() {
    return { APFLayout: this.props.layout };
  }

  render() {
    return this.props.children;
  }
}
