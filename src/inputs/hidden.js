/* @flow */
import React from 'react';
import field from '../core/field';

@field({ layout: false })
export default class HiddenInput extends React.Component {
  props: {
    value?: string,
    onChange: Function
  }

  render() {
    const { value = '', onChange } = this.props;
    return <input type="hidden" value={value} onChange={e => onChange(e.target.value)} />;
  }
}
