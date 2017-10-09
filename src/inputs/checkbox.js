/* @flow */
import React from 'react';
import PropTypes from 'prop-types';
import field from '../core/field';
import type { InputProps, InputEvent } from '../types';

@field()
export default class Checkbox extends React.Component {
  static contextTypes = {
    APFProps: PropTypes.object
  };

  onChange = (event: InputEvent) => {
    this.props.onChange(!!event.target.checked);
  };

  props: InputProps;

  render() {
    const { value, disabled, ...rest } = this.props;
    const { checked, label } = this.context.APFProps || {};
    const isChecked = (value !== undefined ? value : checked) === true;
    const input = (
      <input
        {...rest}
        type="checkbox"
        checked={isChecked}
        onChange={this.onChange}
        disabled={disabled}
      />
    );

    if (!label) return input;

    return (
      <label disabled={disabled}>
        {input}
        {label && <span>{label}</span>}
      </label>
    );
  }
}
