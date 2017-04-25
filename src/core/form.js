/* @flow */
import React from 'react';
import type { FormProps, InputEvent } from '../types';

export default class Form extends React.Component {
  static defaultProps = {
    onSubmit: () => {}
  }

  onSubmit = (event: InputEvent) => {
    event.preventDefault();
    this.props.onSubmit({});
  }

  props: FormProps

  render() {
    const { children } = this.props;

    return (
      <form onSubmit={this.onSubmit} noValidate>
        {children}
      </form>
    );
  }
}
