/* @flow */
import React from 'react';
import field from './field';
import Validator from '../validator';
import type { FormProps, InputEvent } from '../types';

// just an empty field container to hold the form state
const StateContainer = field({ layout: null, nested: true })(({ children }: Object) => children);

export default class Form extends React.Component {
  static defaultProps = {
    onSubmit: () => {},
    onChange: () => {},
    onError: () => {},
    validate: () => {},
    preValidate: data => data,
    preSubmit: data => data,
    postSubmit: () => {},
    defaultValue: {}
  };

  componentWillMount() {
    this.updateValidator(this.props);
  }

  componentWillReceiveProps(props: FormProps) {
    this.updateValidator(props);
  }

  onSubmit = (event: InputEvent) => {
    event.preventDefault();

    if (this.isValid()) {
      const data = this.props.preSubmit(this.value);

      this.props.onSubmit(data);
      this.props.postSubmit(data);
    }
  };

  isValid(): boolean {
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

  validator = new Validator();
  stateContainer: Object;

  get value(): Object {
    return this.stateContainer.value;
  }

  set value(data: Object) {
    this.stateContainer.value = data;
  }

  props: FormProps;

  render() {
    const { children, defaultValue, onChange } = this.props;
    const setRef = e => {
      this.stateContainer = e;
    };

    return (
      <StateContainer defaultValue={defaultValue} onChange={onChange} ref={setRef}>
        <form onSubmit={this.onSubmit} noValidate>
          {children}
        </form>
      </StateContainer>
    );
  }
}
