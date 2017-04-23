/* @flow */
import React from 'react';
import field from '../core/field';

type InputProps = {
  type?: string,
  value?: string,
  onChange: Function
};

type InputEvent = {
  target: {
    value: string
  }
};

@field()
export default class TextInput extends React.Component {
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

  props: InputProps
  rawValue = ''

  render() {
    const { type = 'text' } = this.props;
    return <input type={type} value={this.rawValue} onChange={this.onChange} />;
  }
}
