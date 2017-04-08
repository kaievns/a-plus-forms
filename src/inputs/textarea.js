/* @flow */
import React from 'react';
import field from '../field';

@field()
export default class Textarea extends React.Component {
  props: {
    value?: string,
    onChange: Function
  }

  render() {
    const { value = '', onChange } = this.props;
    return <textarea value={value} onChange={e => onChange(e.target.value)} />;
  }
}
