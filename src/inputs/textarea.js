/* @flow */
/* eslint react/no-unused-prop-types: off */
import React from 'react';
import field from '../core/field';
import Trimmer from '../utils/trimmer';

@field()
export default class Textarea extends React.Component {
  props: {
    value?: string,
    onChange: Function
  }

  render() {
    return <Trimmer {...this.props}><textarea /></Trimmer>;
  }
}
