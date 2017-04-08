/* @flow */
import React from 'react';
import DefaultLayout from './layout';

const noop = () => {};

type FieldProps = {
  name?: string,
  value?: any,
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

    componentWillReceiveProps(props: FieldProps) {
      if ('value' in this.props) {
        this.setState({ value: this.props.value });
      }
    }

    get value() {
      return this.state.value;
    }

    onChangeHandler = (value: any) => {
      const { onChange = noop } = this.props;
      this.setState({ value });
      onChange(value);
    }

    render() {
      const { label, value = '', layout: Layout = DefaultLayout } = this.props;
      const input = <Input value={value} onChange={this.onChangeHandler} />;

      if (!Layout) return input;

      return <Layout label={label} input={input} />;
    }
  };

export default (options?: Object) => (Input: Object) => fieldify(Input, options);
