/* @flow */
import React from 'react';
import DefaultLayout from './layout';

const noop = () => {};

type FieldProps = {
  name?: string,
  value?: string,
  onChange?: Function,
  label?: string,
  error?: string,
  layout?: Object | null | false
};

const fieldify = (Input: Object, options?: Object): Object =>
  class Field extends React.Component {
    state = { value: undefined, touched: false }
    props: FieldProps

    componentWillMount() {
      const { value } = this.props;
      this.setState({ value });
    }

    get value() {
      return this.state.value;
    }

    render() {
      const { label, value = '', onChange = noop, layout: Layout = DefaultLayout } = this.props;
      const input = <Input value={value} onChange={onChange} />;

      if (!Layout) return input;

      return <Layout label={label} input={input} />;
    }
  };

export default (options?: Object) => (Input: Object) => fieldify(Input, options);
