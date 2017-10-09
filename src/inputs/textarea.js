/* @flow */
/* eslint react/no-unused-prop-types: off */
import React from 'react';
import field from '../core/field';
import trimmer from '../utils/trimmer';
import type { InputProps } from '../types';

@field()
@trimmer()
export default class Textarea extends React.Component<InputProps> {
  render() {
    return <textarea {...this.props} />;
  }
}
