/* @flow */
import React from 'react';
import field from '../core/field';
import optionizer from '../utils/optionizer';
import type { InputProps, InputEvent, SelectOption } from '../types';

@field()
@optionizer()
export default class Radios extends React.Component {
  onChange = (event: InputEvent) => {
    this.props.onChange(event.target.value);
  }

  props: InputProps & {
    options?: Array<SelectOption>
  }

  render() {
    const { value: currentValue, options = [] } = this.props;

    return (
      <div>
        {options.map(({ label, value, disabled }, i) =>
          <label key={i} disabled={disabled}>
            <input type="radio" value={value} onChange={this.onChange} checked={value === currentValue} />
            <span>{label}</span>
          </label>
        )}
      </div>
    );
  }
}
