/* @flow */
import React from 'react';
import type { InputProps, InputEvent } from '../types';

export default class Timmer extends React.Component {
  componentWillMount() {
    this.rawValue = this.props.value || '';
  }

  componentWillReceiveProps(props: InputProps) {
    if (props.value !== this.rawValue.trim()) {
      this.rawValue = props.value == null ? '' : props.value;
    }
  }

  onChange = (event: InputEvent) => {
    this.rawValue = event.target.value;
    const trimmedValue = this.rawValue.trim();

    if (this.props.value !== trimmedValue) {
      this.props.onChange(trimmedValue);
    }
  }

  rawValue = ''

  props: InputProps & {
    children?: Object
  }

  render() {
    return this.props.children && React.cloneElement(this.props.children, {
      value: this.rawValue, onChange: this.onChange
    });
  }
}
