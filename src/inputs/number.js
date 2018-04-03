/* @flow */
import React from 'react';
import Input from './text';
import field from '../core/field';
import type { InputProps } from '../types';

type NumberInputProps = InputProps & {
  value?: number
};

@field()
export default class NumberInput extends React.Component<NumberInputProps> {
  onChange = (value: string) => {
    const stringValue = typeof value === 'string' ? value : '';
    const numbericalValue = stringValue.length > 0 ? parseFloat(stringValue) : null;
    this.props.onChange(Number.isNaN(numbericalValue) ? null : numbericalValue);
  };

  render() {
    const { value, ...rest } = this.props;
    const stringValue = value == null ? undefined : `${value}`;

    return (
      <Input {...rest} type="number" layout={null} value={stringValue} onChange={this.onChange} />
    );
  }
}
