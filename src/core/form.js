/* @flow */
import React from 'react';
import PropTypes from 'prop-types';
import Validator from '../validator';
import type { FormProps, InputEvent } from '../types';

type Field = Object; // fixme...

export default class Form extends React.Component {
  static defaultProps = {
    onSubmit: () => {},
    onError: () => {},
    validate: () => {}
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

  componentWillMount() {
    const { validate } = this.props;
    this.validator.update({ validate });
  }

  componentDidMount() {
    const { defaultValue } = this.props;
    if (defaultValue) { this.value = defaultValue; }
  }

  componentWillReceiveProps(props: FormProps) {
    const { validate } = props;
    this.validator.update({ validate });
  }

  onSubmit = (event: InputEvent) => {
    event.preventDefault();
    const data = this.value;
    const errors = this.validator.errorsFor(data);
    if (errors) {
      this.props.onError(errors);
    } else {
      this.props.onSubmit(data);
    }
  }

  validator = new Validator()
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
