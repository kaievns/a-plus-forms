/* @flow */
import React from 'react';
import field from './field';

@field()
export default class Input extends React.Component {
  render() {
    const { type='text', value='', ...rest } = this.props;
    return <input type={type} value={value} {...rest} />;
  }
}
