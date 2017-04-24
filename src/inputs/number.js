/* @flow */
import React from 'react';
import Input from './text';
import field from '../core/field';
import type { InputProps } from '../types';

@field()
export default class NumberInput extends React.Component {
  onChange = (value: string) => {
    this.props.onChange(parseFloat(value));
  }

  props: InputProps & {
    value?: number
  }

  render() {
    const { value = 0, ...rest } = this.props;

    return (
      <Input
        {...rest}
        type="number"
        layout={null}
        value={`${value}`}
        onChange={this.onChange}
      />
    );
  }
}
