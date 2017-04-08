/* @flow */
import React from 'react';
import Input from './text';
import field from '../field';

@field()
export default class EmailInput extends React.Component {
  props: {
    value?: ?string,
    onChange: Function
  }

  render() {
    return <Input {...this.props} layout={null} type='email' />;
  }
}
