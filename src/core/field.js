/* eslint no-use-before-define: off */
import React from 'react';
import PropTypes from 'prop-types';
import Layout from './layout';
import type { FieldProps, FieldOptions, Component, Valuable } from '../types';

export default (options: FieldOptions = {}) => (Input: Component): Component =>
  class Field extends React.Component<FieldProps> {
    static defaultProps = {
      onChange: () => {}
    };

    static contextTypes = {
      APFState: PropTypes.object,
      APFError: PropTypes.object
    };

    static childContextTypes = {
      APFState: PropTypes.object, // nested field anchor
      APFProps: PropTypes.object, // original field props,
      APFError: PropTypes.object // nested field errors
    };

    stateStrategy: ReactStateStrategy | NestedStateStrategy;

    constructor() {
      super();

      const StateStrategy = options.nested ? NestedStateStrategy : ReactStateStrategy;
      this.stateStrategy = new StateStrategy(this);
    }

    getChildContext() {
      return {
        APFProps: this.props,
        APFState: options.nested && this,
        APFError: options.nested && this.props.error
      };
    }

    componentWillMount() {
      if (this.context.APFState) {
        this.context.APFState.stateStrategy.register(this);
      }

      if ('value' in this.props) {
        this.value = this.props.value;
      } else if ('defaultValue' in this.props) {
        this.value = this.props.defaultValue;
      }
    }

    componentWillUnmount() {
      if (this.context.APFState) {
        this.context.APFState.stateStrategy.unregister(this);
      }
    }

    componentWillReceiveProps(props: Valuable) {
      if ('value' in props) {
        this.value = this.props.value;
      }
    }

    get name() {
      return this.props.name;
    }

    get value(): any {
      return this.stateStrategy.value;
    }

    set value(value: any) {
      if (this.stateStrategy.value !== value) {
        this.stateStrategy.value = value;
        this.props.onChange(value);
      }
    }

    get error(): ?string {
      if (options.nested) return null; // delegate to the sub-fields

      const { APFError = {} } = this.context;
      const { error: propsError, name } = this.props;

      return propsError || APFError[name];
    }

    onChange = (value: any) => {
      this.value = value;
    };

    render() {
      const { defaultValue, error, ...props } = this.props; // eslint-disable-line

      Object.assign(props, { value: this.value, onChange: this.onChange });

      return <Layout input={Input} props={props} error={this.error} layout={options.layout} />;
    }
  };

// a generic input field state strategy
class ReactStateStrategy {
  state: Object;
  component: Object;

  constructor(component: Object) {
    this.component = component;
    this.component.state = { value: undefined };
  }

  get value(): any {
    return this.component.state.value;
  }

  set value(value: any) {
    this.component.setState({ value });
  }
}

// a compount input state strategy
// NOTE: a nested field can receive initial values _before_ sub-fields
//       start to register. which, will create a un-sync situation
//       to solve the problem, nested field strategy saves any incoming values
//       in the `seedValues` property and then pipes them into fields as they
//       register
class NestedStateStrategy {
  fields: Array<Valuable> = [];
  seedValues: Object = {};
  component: Object;

  constructor(component: Object) {
    this.component = component;
  }

  register(field: Valuable) {
    this.fields.push(field);

    if (field.name && field.name in this.seedValues) {
      field.value = this.seedValues[field.name];
      delete this.seedValues[field.name];
    }
  }

  unregister(field: Valuable) {
    this.fields.splice(this.fields.indexOf(field), 1);
  }

  get value(): Object {
    return this.fields.reduce(
      (data, field) => Object.assign(data, field.name ? { [field.name]: field.value } : {}),
      {}
    );
  }

  set value(data: any) {
    if (this.fields.length === 0) {
      this.seedValues = { ...data }; // stashing the initial value
    }

    Object.keys(data || {}).forEach(name => {
      const field = this.fields.find(field => field.name === name);
      if (field) field.value = data[name];
    });
  }
}
