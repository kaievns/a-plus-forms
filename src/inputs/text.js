/* @flow */
import React from 'react';
import field from '../core/field';
import Trimmer from '../utils/trimmer';

@field()
export default class TextInput extends React.Component {
  props: {
    type?: string,
    value?: string,
    onChange: Function
  }

  render() {
    const { type = 'text', ...rest } = this.props;
    return <Trimmer {...rest}><input type={type} /></Trimmer>;
  }
}
