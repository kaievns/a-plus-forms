/* @flow */
import React from 'react';
import Layout from './layout';

const noop = () => {};

type FieldProps = {
  name?: string,
  value?: string,
  onChange?: Function,
  label?: string,
  error?: string,
  layout?: Object
};

const fieldify = (Input: Object, options?: Object): Object =>
  class Field extends React.Component {
    props: FieldProps

    render() {
      const { label, value, onChange = noop, layout: CurrentLayout = Layout } = this.props;
      const input = <Input value={value} onChange={onChange} />;

      return <CurrentLayout label={label} input={input} />;
    }
  };

export default (options?: Object) => (Input: Object) => fieldify(Input, options);
