/* @flow */
import React from 'react';
import field from '../core/field';

type Option = {
  label: string,
  value: any,
  disabled?: boolean
};

type InputEvent = {
  target: {
    value: string
  }
};

@field()
export default class Radios extends React.Component {
  onChange = (event: InputEvent) => {
    this.props.onChange(event.target.value);
  }

  props: {
    value?: any,
    onChange: Function,
    options?: Array<Option>
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
