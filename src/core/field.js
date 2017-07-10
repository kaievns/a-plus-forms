/* @flow */
import React from 'react';
import PropTypes from 'prop-types';
import DefaultLayout from './layout';
import type { FieldProps, FieldOptions, Component } from '../types';

let fieldsCounter = 0;

export default (options: FieldOptions = {}) => (Input: Component): Component =>

  class Field extends React.Component {
    static defaultProps = {
      layout: DefaultLayout,
      onChange: () => {}
    }

    static contextTypes = {
      formState: PropTypes.object
    }

    state = { value: undefined, touched: false, id: undefined }

    componentWillMount() {
      const { value, defaultValue, name, id = `a-plus-form-${fieldsCounter++}` } = this.props;
      this.setState({ value: defaultValue !== undefined ? defaultValue : value, id });

      const { formState } = this.context;
      if (name && formState) { formState.register(this); }
    }

    componentWillUnmount() {
      const { formState } = this.context;
      if (formState) { formState.unregister(this); }
    }

    componentWillReceiveProps(props: FieldProps) {
      if ('value' in props) {
        this.setState({ value: this.props.value });
      }
    }

    get name() {
      return this.props.name;
    }

    get value() {
      return this.state.value;
    }

    set value(value: any) {
      this.setState({ value });
      this.props.onChange(value);
    }

    onChange = (value: any) => {
      this.value = value;
    }

    inputProps() {
      const { label, onChange, layout, value, defaultValue, ...rest } = this.props; // eslint-disable-line
      const { bypass = [] } = options;

      bypass.forEach((name) => { rest[name] = this.props[name]; });

      return {
        ...rest,
        value: this.state.value,
        onChange: this.onChange
      };
    }

    layoutProps() {
      const { bypass = [] } = options;
      return ['label'].filter(n => bypass.indexOf(n) === -1)
        .reduce((props, name) => Object.assign(props, { [name]: this.props[name] }), {});
    }

    props: FieldProps

    render() {
      const { label, onChange, layout, value, defaultValue, ...rest } = this.props; // eslint-disable-line
      const input = <Input {...this.inputProps()} />;
      const Layout = 'layout' in options ? options.layout : this.props.layout;

      if (!Layout) return input;

      return <Layout {...this.layoutProps()} input={input} />;
    }
  };
