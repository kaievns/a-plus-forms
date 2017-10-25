import React from 'react';
import PropTypes from 'prop-types';
import field from './field';
import config from '../config';
import FormError from './error';
import type { FormProps, InputEvent, Validator } from '../types';

// just an empty field container to hold the form state
const StateContainer = field({ layout: null, nested: true })(({ children }: Object) => children);
const isPromisish = smth =>
  smth && typeof smth.then === 'function' && typeof smth.catch === 'function';

export default class Form extends React.Component<FormProps> {
  static contextTypes = {
    APFValidator: PropTypes.func
  };

  static defaultProps = {
    onSubmit: () => {},
    onChange: () => {},
    onError: () => {},
    schema: undefined,
    defaultValue: {}
  };
  state = { errors: null };
  validator: ?Validator;

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
        const result = this.props.onSubmit(this.value);

        if (isPromisish(result)) {
          result.catch(error => {
            if (error instanceof FormError) {
              this.handleErrors(error.errors);
            } else {
              throw error;
            }
          });
        }
      }
    });
  };

  handleErrors = (errors: ?Object) => {
    this.setState({ errors });

    if (errors) {
      this.props.onError(errors, this.value);
    }

    return errors;
  };

  validate(): Promise<?Object> {
    const errors = this.validator.errorsFor(this.value);

    if (isPromisish(errors)) {
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

  setStateRef = (e: Object) => {
    this.stateContainer = e;
  };

  render() {
    const { children, defaultValue, onChange } = this.props;
    const { errors } = this.state;

    return (
      <StateContainer
        error={errors}
        defaultValue={defaultValue}
        onChange={onChange}
        ref={this.setStateRef}
      >
        <form onSubmit={this.onSubmit} noValidate>
          {children}
        </form>
      </StateContainer>
    );
  }
}
