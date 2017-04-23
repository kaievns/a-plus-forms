/* @flow */
import React from 'react';
import DefaultLayout from './layout';

const noop = () => {};

type FieldProps = {
  id?: string,
  name?: string,
  value?: any,
  onChange?: Function,
  label?: string,
  error?: string,
  layout?: Object | null | false
};

let fieldsCounter = 0;

const fieldify = (Input: Object, options: Object): Object =>
  class Field extends React.Component {
    state = { value: undefined, touched: false, id: undefined }
    props: FieldProps

    componentWillMount() {
      const { value, id = `a-plus-form-${fieldsCounter++}` } = this.props;
      this.setState({ value, id });
    }

    componentWillReceiveProps(props: FieldProps) {
      if ('value' in props) {
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

    getCurrentLayout() {
      if ('layout' in options) return options.layout;

      const { layout: CurrentLayout = DefaultLayout } = this.props;

      return CurrentLayout;
    }

    render() {
      const { label, onChange, layout, ...rest } = this.props; // eslint-disable-line
      const input = <Input {...rest} onChange={this.onChangeHandler} />;
      const Layout = this.getCurrentLayout();

      if (!Layout) return input;

      return <Layout label={label} input={input} />;
    }
  };

export default (options?: Object) => (Input: Object) => fieldify(Input, options || {});
