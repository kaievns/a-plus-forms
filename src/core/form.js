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

  componentDidMount() {
    const { defaultValue } = this.props;
    if (defaultValue) { this.value = defaultValue; }
  }

  onSubmit = (event: InputEvent) => {
    event.preventDefault();
    this.props.onSubmit(this.value);
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

  set value(data: Object) {
    Object.keys(data).forEach(name => {
      const field = this.fields.find(field => field.name === name);
      if (field) field.value = data[name];
    });
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
