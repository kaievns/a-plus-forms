import React from 'react';
import PropTypes from 'prop-types';
import field from './field';
import config from '../config';
import type { FormProps, InputEvent, Validator } from '../types';

// just an empty field container to hold the form state
const StateContainer = field({ layout: null, nested: true })(({ children }: Object) => children);

export default class Form extends React.Component<FormProps> {
  static contextTypes = {
    APFValidator: PropTypes.func
  };

  static defaultProps = {
    onSubmit: () => {},
    onChange: () => {},
    onError: () => {},
    schema: () => {},
    defaultValue: {}
  };

  validator: Validator;

  componentWillMount() {
    const { APFValidator } = this.context;
    const { schema } = this.props;

    this.validator = new (APFValidator || config.DefaultValidator)(schema);
  }

  componentWillReceiveProps(props: FormProps) {
    const { schema } = props;

    this.validator.schema = schema;
  }

  onSubmit = (event: InputEvent) => {
    event.preventDefault();

    this.validate().then(errors => {
      if (!errors) {
        this.props.onSubmit(this.value);
      }
    });
  };

  handleErrors = (errors: ?Object) => {
    if (errors) {
      this.props.onError(errors, this.value);
    }

    return errors;
  };

  validate(): Promise<?Object> {
    const errors = this.validator.errorsFor(this.value);
    const isPromisish =
      errors && typeof errors.then === 'function' && typeof errors.catch === 'function';

    if (isPromisish) {
      return errors.then(this.handleErrors);
    }
    return { then: cb => cb(this.handleErrors(errors)) };
  }

  stateContainer: Object;

  get value(): Object {
    return this.stateContainer.value;
  }

  set value(data: Object) {
    this.stateContainer.value = data;
  }

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
