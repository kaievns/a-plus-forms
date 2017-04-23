/* @flow */
import React from 'react';
import Input from './text';
import field from '../core/field';

@field()
export default class NumberInput extends React.Component {
  onChange = (value: string) => {
    this.props.onChange(parseFloat(value));
  }

  props: {
    value?: number,
    onChange: Function
  }

  render() {
    const { value = 0 } = this.props;

    return (
      <Input
        layout={null}
        type="number"
        value={`${value}`}
        onChange={this.onChange}
      />
    );
  }
}
