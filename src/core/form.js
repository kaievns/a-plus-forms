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
    validate: () => {},
    preValidate: data => data,
    preSubmit: data => data,
    postSubmit: () => {}
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
    this.updateValidator(this.props);
  }

  componentDidMount() {
    const { defaultValue } = this.props;
    if (defaultValue) { this.value = defaultValue; }
  }

  componentWillReceiveProps(props: FormProps) {
    this.updateValidator(props);
  }

  onSubmit = (event: InputEvent) => {
    event.preventDefault();

    if (this.valid()) {
      const data = this.props.preSubmit(this.value);

      this.props.onSubmit(data);
      this.props.postSubmit(data);
    }
  }

  valid(): boolean {
    const data = this.props.preValidate(this.value);
    const errors = this.validator.errorsFor(data);

    if (errors) {
      this.props.onError(errors, data);
      return false;
    }

    return true;
  }

  updateValidator({ validate, schema }: FormProps) {
    this.validator.update({ validate, schema });
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
