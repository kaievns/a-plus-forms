/* @flow */
import React from 'react';
import field from '../core/field';
import trimmer from '../utils/trimmer';
import type { InputProps } from '../types';

@field()
@trimmer()
export default class TextInput extends React.Component {
  props: InputProps & {
    type?: string
  };

  render() {
    const { type = 'text', ...rest } = this.props;
    return <input type={type} {...rest} />;
  }
}
