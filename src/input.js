import React from 'react';
import field from './field';

@field()
export default class Input extends React.Component {
  render() {
    const { type="text", name, value, onChange } = this.props;

    return (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    );
  }
}
