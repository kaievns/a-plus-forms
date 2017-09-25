/* @flow */
import React from 'react';
import Input from './text';
import field from '../core/field';
import type { InputProps } from '../types';

@field()
export default class EmailInput extends React.Component {
  props: InputProps

  render() {
    console.log({ props: this.props });
    return <Input {...this.props} type="email" layout={null} />;
  }
}
