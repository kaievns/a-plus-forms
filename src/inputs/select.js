/* @flow */
import React from 'react';
import field from '../core/field';
import type { InputProps, InputEvent, SelectOption } from '../types';

@field()
export default class Select extends React.Component {
  onChange = (event: InputEvent) => {
    this.props.onChange(event.target.value);
  }

  props: InputProps & {
    options?: Array<SelectOption>
  }

  render() {
    const { value, options = [], ...rest } = this.props;

    return (
      <select {...rest} value={value} onChange={this.onChange}>
        {options.map(({ label, value, disabled }, i) =>
          <option key={i} value={value} disabled={disabled}>{label}</option>
        )}
      </select>
    );
  }
}
