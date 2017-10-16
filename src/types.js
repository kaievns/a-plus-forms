/* @flow */
import React from 'react';

export type Component = Class<React.Component<*, *>> | Function; // eslint-disable-line

export type Valuable = {
  name?: string,
  value?: any,
  defaultValue?: any,
  onChange: Function
};

export type FormProps = Valuable & {
  value?: ?Object,
  defaultValue?: ?Object,
  schema: Object | Function,
  onSubmit: Function,
  onError: Function,
  children: Object
};

export type FieldProps = Valuable & {
  id?: string,
  label?: string,
  error?: string,
  className?: string,
  layout?: Component | null | false
};

export type FieldOptions = {
  layout?: Component | null | false,
  nested?: boolean
};

export type InputProps = {
  id?: string,
  name?: string,
  value?: string,
  onChange: Function,
  className?: string,
  placeholder?: string,
  disabled?: boolean
};

export type InputEvent = {
  preventDefault: Function,
  target: {
    value: string,
    checked?: boolean
  }
};

export type SelectOption = {
  label: string,
  value: string,
  disabled?: boolean
};

export type Element = {
  setState: Function,
  state?: Object
};

export type LayoutProps = {
  input: any,
  label?: string,
  error?: string
};

export type Validator = {
  schema: any,
  errorsFor: Function
};
