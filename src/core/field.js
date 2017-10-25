import React from 'react';
import PropTypes from 'prop-types';
import Layout from './layout';
import StateManager from './state';
import type { FieldProps, FieldOptions, Component, Valuable } from '../types';

export default (options: FieldOptions = {}) => (Input: Component): Component =>
  class Field extends React.Component<FieldProps> {
    static defaultProps = {
      onChange: () => {}
    };

    static contextTypes = {
      APFState: PropTypes.object,
      APFError: PropTypes.object,
      APFDirty: PropTypes.bool
    };

    static childContextTypes = {
      APFState: PropTypes.object, // nested field anchor
      APFProps: PropTypes.object, // original field props,
      APFError: PropTypes.object, // nested field errors
      APFDirty: PropTypes.bool
    };

    stateManager: StateManager;

    constructor() {
      super();

      this.stateManager = new StateManager(this, { nested: options.nested });
    }

    getChildContext() {
      return {
        APFProps: this.props,
        APFDirty: this.props.dirty,
        APFState: options.nested && this.stateManager,
        APFError:
          (options.nested && typeof this.props.error === 'object' && this.props.error) || undefined
      };
    }

    componentWillMount() {
      if (this.context.APFState) {
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

    get name() {
      return this.props.name;
    }

    get value(): any {
      return this.stateManager.value;
    }

    set value(value: any) {
      if (this.stateManager.value !== value) {
        this.stateManager.value = value;
        this.props.onChange(value);
      }
    }

    get error(): ?string {
      const { APFError = {} } = this.context;
      const { error: propsError, name } = this.props;
      const error = propsError || APFError[name];

      if (options.nested && typeof error !== 'string') {
        return (error && error['']) || null; // delegate to the sub-fields
      }

      return error;
    }

    get dirty(): boolean {
      const { dirty } = this.props;
      return dirty === undefined ? this.context.APFDirty : dirty;
    }

    onChange = (value: any) => {
      this.value = value;
    };

    render() {
      const { defaultValue, error, dirty, ...props } = this.props; // eslint-disable-line

      Object.assign(props, { value: this.value, onChange: this.onChange });

      return (
        <Layout
          input={Input}
          props={props}
          error={this.error}
          dirty={this.dirty}
          layout={options.layout}
        />
      );
    }
  };
