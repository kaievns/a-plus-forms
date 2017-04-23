/* @flow */
import React from 'react';
import Input from './text';
import field from '../core/field';
import type { InputProps } from '../types';

@field()
export default class PasswordInput extends React.Component {
  props: InputProps

  render() {
    const { value, onChange } = this.props;
    return <Input type="password" layout={null} value={value} onChange={onChange} />;
  }
}
