/* @flow */
import React from 'react';

export type JSONSchema = {
  type: 'object' | 'array' | 'string' | 'boolean' | 'number',
  properties?: { [string]: JSONSchema },
  items?: JSONSchema,
  required?: Array<string>
};

export type Valuable = {
  name?: string,
  value?: any,
  defaultValue?: any,
  onChange: Function
};

export type FormProps = Valuable & {
  onSubmit: Function,
  value?: ?Object,
  defaultValue?: ?Object,
  validate: Function,
  schema?: JSONSchema,
  preValidate: Function,
  preSubmit: Function,
  postSubmit: Function,
  onError: Function,
  children: Object
};

export type FieldProps = Valuable & {
  id?: string,
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

export type Component = Class<React.Component<*, *, *>> | Function; // eslint-disable-line
