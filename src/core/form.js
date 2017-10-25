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
  state = { errors: null, dirty: false };
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

  onChange = (value: Object) => {
    this.props.onChange(value);

    if (this.state.dirty) {
      this.validate(value);
    }
  };

  onSubmit = (event: InputEvent) => {
    event.preventDefault();

    this.validate().then(errors => {
      this.setState({ dirty: true });

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

  validate(value?: Object = this.value): Promise<?Object> {
    const errors = this.validator.errorsFor(value);

    if (isPromisish(errors)) {
      return errors.then(this.handleErrors);
    }

    this.handleErrors(errors);

    return { then: cb => cb(errors) };
  }

  handleErrors = (errors: ?Object) => {
    this.setState({ errors });

    if (errors) {
      this.props.onError(errors, this.value);
    }

    return errors;
  };

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
    const { children, defaultValue } = this.props;
    const { errors, dirty } = this.state;

    return (
      <StateContainer
        dirty={dirty}
        error={errors}
        defaultValue={defaultValue}
        onChange={this.onChange}
        ref={this.setStateRef}
      >
        <form onSubmit={this.onSubmit} noValidate>
          {children}
        </form>
      </StateContainer>
    );
  }
}
