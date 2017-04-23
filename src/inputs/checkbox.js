/* @flow */
import React from 'react';
import field from '../core/field';
import type { InputProps, InputEvent } from '../types';

@field({ bypass: ['label'] })
export default class Checkbox extends React.Component {
  onChange = (event: InputEvent) => {
    this.props.onChange(!!event.target.checked);
  }

  props: InputProps & {
    label?: string,
    value?: boolean,
    checked?: boolean
  }

  render() {
    const { value, checked, label } = this.props;
    const isChecked = (value !== undefined ? value : checked) === true;
    const input = <input type="checkbox" checked={isChecked} onChange={this.onChange} />;

    if (!label) return input;

    return <label>{input}{label && <span>{label}</span>}</label>;
  }
}
