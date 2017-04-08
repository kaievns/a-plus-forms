/* @flow */
import React from 'react';
import Layout from './layout';

const noop = () => {};

const fieldify = (Input: Object, options?: Object): Object =>
  class Field extends React.Component {
    render() {
      const { label, value, onChange=noop, name } = this.props;
      const input = <Input name={name} value={value} onChange={onChange} />;

      return <Layout label={label} input={input} />;
    }
  };

export default (options?: Object) => (Input: Object) => fieldify(Input, options);
