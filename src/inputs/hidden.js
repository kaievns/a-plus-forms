/* @flow */
import React from 'react';
import field from '../core/field';

type InputEvent = {
  target: {
    value: string
  }
};

@field({ layout: false })
export default class HiddenInput extends React.Component {
  onChange = (event: InputEvent) => {
    this.props.onChange(event.target.value);
  }

  props: {
    value?: string,
    onChange: Function
  }

  render() {
    const { value = '' } = this.props;
    return <input type="hidden" value={value} onChange={this.onChange} />;
  }
}
