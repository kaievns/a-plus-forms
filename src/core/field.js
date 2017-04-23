/* @flow */
import React from 'react';
import DefaultLayout from './layout';
import type { FieldProps, FieldOptions } from '../types';

let fieldsCounter = 0;

const fieldify = (Input: Object, options: FieldOptions): Object =>
  class Field extends React.Component {
    static defaultProps = {
      layout: DefaultLayout,
      onChange: () => {}
    }

    state = { value: undefined, touched: false, id: undefined }

    componentWillMount() {
      const { value, defaultValue, id = `a-plus-form-${fieldsCounter++}` } = this.props;
      this.setState({ value: defaultValue !== undefined ? defaultValue : value, id });
    }

    componentWillReceiveProps(props: FieldProps) {
      if ('value' in props) {
        this.setState({ value: this.props.value });
      }
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

export default (options?: FieldOptions) => (Input: Object) => fieldify(Input, options || {});
