import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'fast-deep-equal';
import Layout from './layout';
import StateManager from './state';
import { ErrorsManager } from './error';
import type { FieldProps, FieldOptions, Component, Valuable } from '../types';

export default (options: FieldOptions = {}) => (Input: Component): Component => {
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
      APFField: PropTypes.object, // a reference to the field itself
      APFState: PropTypes.object, // nested field anchor
      APFProps: PropTypes.object, // original field props,
      APFError: PropTypes.object, // nested field errors
      APFDirty: PropTypes.bool
    };

    static InnerInput = Input;

    static fieldOptions = options;

    stateManager: StateManager;

    errorsManager: ErrorsManager;

    constructor() {
      super();

      this.stateManager = new StateManager(this);
      this.errorsManager = new ErrorsManager(this);

      if (options.array) {
        this.addEntry = this.addEntry.bind(this);
        this.removeEntry = this.removeEntry.bind(this);
      }
    }

    getChildContext() {
      const isCompound = options.nested || options.array;
      const error = this.errorsManager.getCurrentError();
      const isNestedError = error && typeof error === 'object';

      return {
        APFField: this,
        APFProps: this.props,
        APFDirty: this.props.dirty,
        APFState: isCompound && this.stateManager,
        APFError: isCompound && isNestedError ? error : undefined
      };
    }

    UNSAFE_componentWillMount() {
      this.checkForNewValueIn(this.props, true);

      if (this.context.APFState) {
        this.context.APFState.register(this);
      }
    }

    isUnmounted = false;

    componentWillUnmount() {
      this.isUnmounted = true;

      if (this.context.APFState) {
        this.context.APFState.unregister(this);
      }
    }

    UNSAFE_componentWillReceiveProps(props: Valuable) {
      this.checkForNewValueIn(props, false);
    }

    checkForNewValueIn(props: Valuable, isInitialCall: boolean) {
      const triggerOnChange = !isInitialCall;

      if ('value' in props) {
        this.stateManager.setValue(props.value, triggerOnChange);
      } else if ('defaultValue' in props) {
        // something was changed or an initial call
        if (isInitialCall) {
          // if field has an initial value set (even falsy ones) use it. otherwise default
          this.stateManager.setValue(
            this.value !== undefined ? this.value : props.defaultValue,
            triggerOnChange
          );
        } else if (!isEqual(this.props.defaultValue, props.defaultValue)) {
          this.stateManager.setValue(props.defaultValue, triggerOnChange);
        }
      } else if ('defaultValue' in options) {
        // something was changed or an initial call
        if (isInitialCall) {
          // if field has an initial value set (even falsy ones) use it. otherwise default
          this.stateManager.setValue(
            this.value !== undefined ? this.value : options.defaultValue,
            triggerOnChange
          );
        }
      }
    }

    get name() {
      return this.props.name;
    }

    get value(): any {
      return this.stateManager.getValue();
    }

    set value(value: any) {
      this.stateManager.setValue(value);
    }

    get error(): ?string {
      return this.errorsManager.getErrorMessage();
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

      if (options.array === true) {
        props.value = props.value || [];
        props.addEntry = this.addEntry;
        props.removeEntry = this.removeEntry;
      }

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
  }

  if (options.array) {
    Object.assign(Field.prototype, {
      addEntry(newItem: any) {
        const { value = [] } = this;
        this.value = value.concat(newItem);
      },

      removeEntry(index: number) {
        const { value = [] } = this;
        this.value = [...value.slice(0, index), ...value.slice(index + 1)];
      }
    });
  }

  return Field;
};
