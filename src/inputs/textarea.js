/* @flow */
/* eslint react/no-unused-prop-types: off */
import React from 'react';
import field from '../core/field';
import Trimmer from '../utils/trimmer';
import type { InputProps } from '../types';

@field()
export default class Textarea extends React.Component {
  props: InputProps

  render() {
    return <Trimmer {...this.props}><textarea /></Trimmer>;
  }
}
