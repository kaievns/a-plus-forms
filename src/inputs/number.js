/* @flow */
import React from 'react';
import Input from './text';
import field from '../field';

@field()
export default class NumberInput extends React.Component {
  props: {
    value?: number,
    onChange: Function
  }

  render() {
    const { onChange, value = 0, ...rest } = this.props;
    return (
      <Input
        {...rest}
        layout={null}
        type='number'
        value={`${value }`}
        onChange={v => onChange(parseFloat(v))}
      />
    );
  }
}
