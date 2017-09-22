/* @flow */
import React from 'react';
import PropTypes from 'prop-types';
import Layout from './layout';
import type { FieldProps, FieldOptions, Component, Element } from '../types';

export default (options: FieldOptions = {}) => (Input: Component): Component =>
  class Field extends React.Component {
    static defaultProps = {
      onChange: () => {}
    }

    static contextTypes = {
      APFState: PropTypes.object
    }

    static childContextTypes = {
      APFState: PropTypes.object
    }

    stateStrategy: ReactStateStrategy | CompoundStateStrategy

    constructor() {
      super();
      this.stateStrategy = new ReactStateStrategy(this);
    }

    getChildContext() {
      return { APFState: this };
    }

    componentWillMount() {
      if (this.name && this.context.APFState) {
        this.context.APFState.register(this);
      }

      if ('value' in this.props) {
        this.value = this.props.value;
      } else if ('defaultValue' in this.props) {
        this.value = this.props.defaultValue;
      }
    }

    componentWillUnmount() {
      if (this.context.APFState) {
        this.context.APFState.unregister(this);
      }
    }

    componentWillReceiveProps(props: Valuable) {
      if ('value' in props) {
        this.value = this.props.value;
      }
    }

    register(field: Valuable) {
      if (!(this.stateStrategy instanceof CompoundStateStrategy)) {
        this.stateStrategy = new CompoundStateStrategy();
      }

      this.stateStrategy.register(field);
    }

    unregister(field: Valuable) {
      if (this.stateStrategy instanceof CompoundStateStrategy) {
        this.stateStrategy.unregister(field);
      }
    }

    get name() {
      return this.props.name;
    }

    get value(): any {
      return this.stateStrategy.value;
    }

    set value(value: any) {
      this.stateStrategy.value = value;
      this.props.onChange(this.value);
    }

    onChange = (value: any) => {
      this.value = value;
    }

    props: FieldProps

    render() {
      const { defaultValue, ...props } = this.props; // eslint-disable-line

      Object.assign(props, { value: this.value, onChange: this.onChange });

      return <Layout input={Input} props={props} options={options} />;
    }
  };

// a generic input field state strategy
class ReactStateStrategy {
  state: Object
  component: Object

  constructor(component: Object) {
    this.component = component;
    this.component.state = { value: undefined };
  }

  get value(): any {
    return this.component.state.value;
  }

  set value(value: any) {
    this.component.setState({ value });
    // HACK shortcutting the async setState, to make the new value available right away
    Object.assign(this.component.state, { value });
  }
}

// a compount input state strategy
class CompoundStateStrategy {
  fields: Array<Valuable> = []

  register(field: Valuable) {
    this.fields.push(field);
  }

  unregister(field: Valuable) {
    this.fields.splice(this.fields.indexOf(field), 1);
  }

  get value(): Object {
    return this.fields.reduce((data, field) =>
      Object.assign(data, field.name ? { [field.name]: field.value } : {})
    , {});
  }

  set value(data: any) {
    Object.keys(data).forEach(name => {
      const field = this.fields.find(field => field.name === name);
      if (field) field.value = data[name];
    });
  }
}
