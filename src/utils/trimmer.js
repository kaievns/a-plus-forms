/* @flow */
import React from 'react';
import type { InputProps, InputEvent } from '../types';

export default () => (TextInput: Object) =>
  class Trimmer extends React.Component<InputProps> {
    UNSAFE_componentWillMount() {
      this.rawValue = this.props.value || '';
    }

    UNSAFE_componentWillReceiveProps(props: InputProps) {
      if (props.value !== this.rawValue.trim()) {
        this.rawValue = props.value == null ? '' : props.value;
        this.forceUpdate();
      }
    }

    onChange = (event: InputEvent) => {
      this.rawValue = event.target.value;
      const trimmedValue = this.rawValue.trim();

      if (this.props.value !== trimmedValue) {
        this.props.onChange(trimmedValue);
      }

      this.forceUpdate();
    };

    rawValue = '';

    render() {
      return <TextInput {...this.props} value={this.rawValue} onChange={this.onChange} />;
    }
  };
