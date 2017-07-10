/* @flow */
import React from 'react';
import PropTypes from 'prop-types';
import state from './state';
import Validator from '../validator';
import type { FormProps, InputEvent } from '../types';

@state()
export default class Form extends React.Component {
  static defaultProps = {
    onSubmit: () => {},
    onError: () => {},
    validate: () => {},
    preValidate: data => data,
    preSubmit: data => data,
    postSubmit: () => {}
  }

  static contextTypes = {
    formState: PropTypes.object
  }

  componentWillMount() {
    this.updateValidator(this.props);
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

  get value(): Object {
    return this.context.formState.value;
  }

  set value(data: Object) {
    this.context.formState.value = data;
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
