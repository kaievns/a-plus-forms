/* @flow */
import React from 'react';
import field from '../core/field';
import type { InputProps, InputEvent } from '../types';

@field({ layout: false })
export default class HiddenInput extends React.Component {
  onChange = (event: InputEvent) => {
    this.props.onChange(event.target.value);
  }

  props: InputProps

  render() {
    const { value = '' } = this.props;
    return <input type="hidden" value={value} onChange={this.onChange} />;
  }
}
