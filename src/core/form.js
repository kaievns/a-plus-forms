/* @flow */
import React from 'react';
import PropTypes from 'prop-types';
import type { FormProps, InputEvent } from '../types';

type Field = Object; // fixme...

export default class Form extends React.Component {
  static defaultProps = {
    onSubmit: () => {}
  }

  static childContextTypes = {
    registerField: PropTypes.func,
    unRegisterField: PropTypes.func
  }

  getChildContext() {
    return {
      registerField: this.registerField,
      unRegisterField: this.unRegisterField
    };
  }

  onSubmit = (event: InputEvent) => {
    event.preventDefault();
    this.props.onSubmit({});
  }

  fields: Array<Field> = []

  registerField = (field: Field) => {
    this.fields.push(field);
  }

  unRegisterField = (field: Field) => {
    const index = this.fields.indexOf(field);
    this.fields.splice(index, 1);
  }

  get value(): Object {
    return this.fields.reduce((data, field) =>
      Object.assign(data, { [field.name]: field.value })
    , {});
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
