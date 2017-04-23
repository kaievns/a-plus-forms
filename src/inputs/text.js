/* @flow */
import React from 'react';
import field from '../core/field';
import Trimmer from '../utils/trimmer';
import type { InputProps } from '../types';

@field()
export default class TextInput extends React.Component {
  props: InputProps & {
    type?: string
  }

  render() {
    const { type = 'text', ...rest } = this.props;
    return <Trimmer {...rest}><input type={type} /></Trimmer>;
  }
}
