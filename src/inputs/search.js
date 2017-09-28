/* @flow */
import React from 'react';
import Input from './text';
import field from '../core/field';
import type { InputProps } from '../types';

@field()
export default class SearchInput extends React.Component {
  props: InputProps

  render() {
    return <Input {...this.props} type="search" layout={null} />;
  }
}
