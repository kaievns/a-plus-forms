/* @flow */
import React from 'react';
import field from '../core/field';

type InputEvent = {
  target: {
    value: string
  }
};

@field()
export default class Slider extends React.Component {
  props: {
    min?: number,
    max?: number,
    step?: number,
    value: ?number,
    onChange: Function
  }

  changeHandler = (event: InputEvent) => {
    this.props.onChange(parseFloat(event.target.value));
  }

  render() {
    const { min = 0, max = 10, step = 1, value = 0 } = this.props;
    return (
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={this.changeHandler}
        onMouseUp={this.changeHandler}
      />
    );
  }
}
