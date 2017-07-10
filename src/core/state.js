/* @flow */
import React from 'react';
import PropTypes from 'prop-types';
import type { Valuable, Component } from '../types';

export default () => (Input: Component): Component =>
  class StateProvider extends React.Component {
    static defaultProps = {
      onChange: () => {}
    }

    static childContextTypes = {
      formState: PropTypes.object
    }

    state = { value: undefined, touched: false }

    getChildContext() {
      return { formState: this };
    }

    componentDidMount() {
      if ('defaultValue' in this.props) {
        this.value = this.props.defaultValue || {};
      }
    }

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

    set value(data: Object) {
      Object.keys(data).forEach(name => {
        const field = this.fields.find(field => field.name === name);
        if (field) field.value = data[name];
      });
    }

    props: Valuable

    render() {
      return <Input {...this.props} />;
    }
  };
