/* @flow */
import React from 'react';
import PropTypes from 'prop-types';

type Field = Object; // fixme...

export default class StateProvider extends React.Component {
  static childContextTypes = {
    formState: PropTypes.object
  }

  state = { values: {}, errors: {}, touched: {} }

  getChildContext() {
    return { formState: this };
  }

  fields: Array<Field> = []

  register(field: Field) {
    this.fields.push(field);
  }

  unregister(field: Field) {
    this.fields.splice(this.fields.indexOf(field), 1);
  }

  get value(): Object {
    return this.fields.reduce((data, field) =>
      Object.assign(data, { [field.name]: field.value })
    , {});
  }

  set value(data: Object) {
    Object.keys(data).forEach(name => {
      const field = this.fields.find(field => field.name === name);
      if (field) field.value = data[name];
    });
  }

  props: {
    children?: any
  }

  render() {
    return this.props.children;
  }
}
