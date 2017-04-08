/* @flow */
import React from 'react';
import field from '../field';

@field()
export default class TextInput extends React.Component {
  props: {
    type?: string,
    value?: ?string,
    onChange: Function
  }

  render() {
    const { type='text', value='', onChange } = this.props;
    return <input type={type} value={value} onChange={e => onChange(e.target.value)} />;
  }
}
