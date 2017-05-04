/* @flow */
import React from 'react';

export type FormProps = {
  onSubmit: Function,
  value?: ?Object,
  defaultValue?: ?Object,
  validate: Function,
  onError: Function,
  children: Object
};

export type FieldProps = {
  id?: string,
  name?: string,
  value?: any,
  onChange: Function,
  defaultValue?: any,
  label?: string,
  error?: string,
  layout?: Object | null | false
};

export type FieldOptions = {
  layout?: null | false | Object,
  bypass?: Array<string>
};

export type InputProps = {
  id?: string,
  name?: string,
  value?: string,
  onChange: Function,
  placeholder?: string,
  disabled?: boolean
};

export type InputEvent = {
  preventDefault: Function,
  target : {
    value: string,
    checked?: boolean
  }
};

export type SelectOption = {
  label: string,
  value: string,
  disabled?: boolean
};

export type JSONSchema = {
  type: 'object' | 'array' | 'string' | 'boolean' | 'number',
  properties?: { [string]: JSONSchema },
  required?: Array<string>
};

export type Component = Class<React.Component<*, *, *>> | Function; // eslint-disable-line
