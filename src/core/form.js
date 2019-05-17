import React from 'react';
import PropTypes from 'prop-types';
import field from './field';
import config from '../config';
import FormError from './error';
import type { FormProps, InputEvent, Validator } from '../types';

// just an empty field container to hold the form state
const StateContainer = field({ layout: null, nested: true })(({ children, error }: Object) => {
  const output = React.Children.toArray(children);

  if (error != null) { // eslint-disable-line
    output.unshift(React.cloneElement(error, { key: 'errors' }));
  }

  return output;
});
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
  state = { errors: null, dirty: false, disabled: false };
  validator: ?Validator;
  isUnmounted = false;

  setState(...args) {
    if (!this.isUnmounted) {
      return super.setState(...args);
    }
  }

  componentWillMount() {
    const { APFValidator } = this.context;
    const { schema } = this.props;

    this.validator = new (APFValidator || config.DefaultValidator)(schema);
  }

  componentWillUnmount() {
    this.isUnmounted = true;
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
    this.submit();
  };

  waitForServerResponse(request: Promise) {
    this.setState({ disabled: true });

    request
      .then(() => {
        this.setState({ disabled: false });
      })
      .catch(error => {
        this.setState({ disabled: false });

        if (error instanceof FormError) {
          this.handleErrors(error.errors);
        } else {
          throw error;
        }
      });
  }

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

  submit() {
    this.validate().then(errors => {
      this.setState({ dirty: true });

      if (!errors) {
        const result = this.props.onSubmit(this.value);
        if (isPromisish(result)) {
          this.waitForServerResponse(result);
        }
      }
    });
  }

  reset() {
    this.setState({ dirty: false });
    this.value = this.props.defaultValue || {};
  }

  setStateRef = (e: Object) => {
    this.stateContainer = e;
  };

  render() {
    const { children, defaultValue, className, name, id } = this.props;
    const { errors, dirty, disabled } = this.state;

    return (
      <form
        id={id}
        name={name}
        onSubmit={this.onSubmit}
        className={className}
        noValidate
        disabled={disabled}
      >
        <StateContainer
          dirty={dirty}
          error={errors}
          defaultValue={defaultValue}
          onChange={this.onChange}
          layout={config.FormLayout}
          ref={this.setStateRef}
        >
          {children}
        </StateContainer>
      </form>
    );
  }
}
