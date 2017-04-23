/* @flow */
import React from 'react';
import Input from './text';
import field from '../core/field';

@field()
export default class EmailInput extends React.Component {
  props: {
    value?: string,
    onChange: Function
  }

  render() {
    const { value, onChange } = this.props;
    return <Input type="email" layout={null} value={value} onChange={onChange} />;
  }
}
