/* @flow */
import React from 'react';
import field from '../core/field';
import type { InputProps, InputEvent } from '../types';

@field({ bypass: ['label'] })
export default class Checkbox extends React.Component {
  onChange = (event: InputEvent) => {
    this.props.onChange(!!event.target.checked);
  }

  props: InputProps & {
    label?: string,
    value?: boolean,
    checked?: boolean
  }

  render() {
    const { value, checked, label, disabled, ...rest } = this.props;
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

    return <label disabled={disabled}>{input}{label && <span>{label}</span>}</label>;
  }
}
