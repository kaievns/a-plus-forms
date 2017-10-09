import React from 'react';
import field from '../core/field';
import optionizer from '../utils/optionizer';
import type { InputProps, InputEvent, SelectOption } from '../types';

type DOMElement = {
  querySelectorAll: Function
};

type SelectProps = InputProps & {
  options?: Array<SelectOption>,
  multiple?: boolean,
  size?: number | string
};

@field()
@optionizer()
export default class Select extends React.Component<SelectProps> {
  onChange = (event: InputEvent) => {
    const { multiple, onChange } = this.props;

    if (multiple) {
      const options = this.selectRef.querySelectorAll('option');
      const values = [];
      options.forEach(option => {
        if (option.selected) {
          values.push(option.value);
        }
      });
      onChange(values);
    } else {
      onChange(event.target.value);
    }
  };

  selectRef: DOMElement;

  saveRef = (element: DOMElement) => {
    this.selectRef = element;
  };

  render() {
    const { value, options = [], ...rest } = this.props;

    return (
      <select {...rest} value={value} onChange={this.onChange} ref={this.saveRef}>
        {options.map(({ label, value, disabled }, i) => (
          <option key={i} value={value} disabled={disabled}>
            {label}
          </option>
        ))}
      </select>
    );
  }
}
