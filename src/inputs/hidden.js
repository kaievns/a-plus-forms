/* @flow */
import React from 'react';
import field from '../core/field';
import type { InputProps, InputEvent } from '../types';

@field({ layout: false })
export default class HiddenInput extends React.Component<InputProps> {
  onChange = (event: InputEvent) => {
    this.props.onChange(event.target.value);
  };

  render() {
    return <input type="hidden" value={this.props.value} onChange={this.onChange} />;
  }
}
