/* @flow */
import React from 'react';
import field from '../core/field';
import trimmer from '../utils/trimmer';
import type { InputProps } from '../types';

type TextInputProps = InputProps & {
  type?: string
};

@field()
@trimmer()
export default class TextInput extends React.Component<TextInputProps> {
  render() {
    const { type = 'text', ...rest } = this.props;
    return <input type={type} {...rest} />;
  }
}
