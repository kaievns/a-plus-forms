/* @flow */
import React from 'react';
import field from '../core/field';

type CheckboxEvent = {
  target: {
    checked?: boolean
  }
};

@field({ bypass: ['label'] })
export default class Checkbox extends React.Component {
  onChange = (event: CheckboxEvent) => {
    this.props.onChange(!!event.target.checked);
  }

  props: {
    label?: string,
    value?: boolean,
    checked?: boolean,
    onChange: Function
  }

  render() {
    const { value, checked, label } = this.props;
    const isChecked = (value !== undefined ? value : checked) === true;
    const input = <input type="checkbox" checked={isChecked} onChange={this.onChange} />;

    if (!label) return input;

    return <label>{input}{label && <span>{label}</span>}</label>;
  }
}
