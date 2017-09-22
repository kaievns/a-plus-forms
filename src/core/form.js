/* @flow */
import React from 'react';
import PropTypes from 'prop-types';
import field from './field';
import Validator from '../validator';
import type { FormProps, InputEvent } from '../types';

// just an empty field container to hold the form state
const StateContainer = field({ layout: null })((p: Object) => p.children);

export default class Form extends React.Component {
  static defaultProps = {
    onSubmit: () => {},
    onError: () => {},
    validate: () => {},
    preValidate: data => data,
    preSubmit: data => data,
    postSubmit: () => {},
    defaultValue: {}
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
    return this.refs.state.value;
  }

  set value(data: Object) {
    this.refs.state.value = data;
  }

  props: FormProps

  render() {
    const { children, defaultValue } = this.props;

    return (
      <form onSubmit={this.onSubmit} noValidate>
        <StateContainer {...{ defaultValue, children }} ref="state" />
      </form>
    );
  }
}
