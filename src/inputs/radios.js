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
    const { value: currentValue, options = [], name, ...rest } = this.props;

    return (
      <div>
        {options.map(({ label, value, disabled }, i) => {
          const id = Math.random()
            .toString(16)
            .slice(2);

          return (
            <label key={i} htmlFor={id} disabled={disabled}>
              <input
                {...rest}
                id={id}
                type="radio"
                value={value}
                onChange={this.onChange}
                checked={value === currentValue}
              />
              <span>{label}</span>
            </label>
          );
        })}
      </div>
    );
  }
}
