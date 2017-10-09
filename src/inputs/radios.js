/* @flow */
import React from 'react';
import field from '../core/field';
import optionizer from '../utils/optionizer';
import type { InputProps, InputEvent, SelectOption } from '../types';

type RadiosProps = InputProps & {
  options?: Array<SelectOption>
};

@field()
@optionizer()
export default class Radios extends React.Component<RadiosProps> {
  onChange = (event: InputEvent) => {
    this.props.onChange(event.target.value);
  };

  render() {
    const { value: currentValue, options = [], name } = this.props;

    return (
      <div>
        {options.map(({ label, value, disabled }, i) => (
          <label key={i} disabled={disabled}>
            <input
              type="radio"
              name={name}
              value={value}
              onChange={this.onChange}
              checked={value === currentValue}
            />
            <span>{label}</span>
          </label>
        ))}
      </div>
    );
  }
}
