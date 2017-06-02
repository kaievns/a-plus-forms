/* @flow */
import React from 'react';
import StateProvider from './state';
import Validator from '../validator';
import type { FormProps, InputEvent } from '../types';

export default class Form extends React.Component {
  static defaultProps = {
    onSubmit: () => {},
    onError: () => {},
    validate: () => {},
    preValidate: data => data,
    preSubmit: data => data,
    postSubmit: () => {}
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

  stateProvider = React.createElement(StateProvider)

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
    return this.stateProvider.value;
  }

  set value(data: Object) {
    this.stateProvider.value = data;
  }

  props: FormProps

  render() {
    const { children } = this.props;

    return (
      <StateProvider ref={n => (this.stateProvider = n)}>
        <form onSubmit={this.onSubmit} noValidate>
          {children}
        </form>
      </StateProvider>
    );
  }
}
