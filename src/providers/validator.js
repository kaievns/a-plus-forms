/* @flow */
import React from 'react';
import PropTypes from 'prop-types';
import type { Validator } from '../types';

type ProviderProps = {
  validator: Validator,
  children: PropTypes.element
};

export default class ValidatorProvider extends React.Component<ProviderProps> {
  static childContextTypes = {
    APFValidator: PropTypes.func.isRequired
  };

  getChildContext() {
    return {
      APFValidator: this.props.validator
    };
  }

  render() {
    return this.props.children;
  }
}
