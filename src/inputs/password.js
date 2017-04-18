/* @flow */
import React from 'react';
import Input from './text';
import field from '../field';

@field()
export default class PasswordInput extends React.Component {
  props: {
    value?: string,
    onChange: Function
  }

  render() {
    const { value, onChange } = this.props;
    return <Input type="password" layout={null} value={value} onChange={onChange} />;
  }
}
