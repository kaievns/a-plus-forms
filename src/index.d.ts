/* tslint:disable:max-classes-per-file */
/* tslint:disable:ban-types */
declare module 'a-plus-forms' {
  export interface FormProps {
    value?: object
    defaultValue?: object
    onChange?: Function
    schema?: Object | Function
    className?: string
    onSubmit?: Function
    onError?: Function
    children: React.ReactChildren | React.ReactChild | JSX.Element | JSX.Element[]
  }

  export interface InputProps {
    id?: string
    name?: string
    help?: string
    label?: string
    value?: any
    defaultValue?: any
    className?: string
    placeholder?: string
    disabled?: boolean
    required?: boolean
    onChange?: Function
    layout?: React.Component | Function | null | false
  }

  export interface LayoutProps {
    input: InputProps
    label?: string
    error?: string
    className?: string
  }

  export type Options = any[] | object;

  export class Layout extends React.PureComponent<LayoutProps> {}

  export class GenericInput extends React.Component<InputProps> {}

  export class Checkbox extends GenericInput {}
  export class EmailInput extends GenericInput {}
  export class HiddenInput extends GenericInput {}
  export class NumberInput extends GenericInput {}
  export class PasswordInput extends GenericInput {}
  export class PhoneInput extends GenericInput {}
  export class Radios extends GenericInput {
    props: InputProps & {
      options?: Options
    };
  }
  export class SearchInput extends GenericInput {}
  export class Select extends GenericInput {
    props: InputProps & {
      options?: Options
      multiple?: boolean
      clearable?: boolean
    };
  }
  export class Slider extends GenericInput {}
  export class TextInput extends GenericInput {
    props: InputProps & {
      type?: 'text' | 'password' | 'email' | 'number'
    };
  }
  export class Textarea extends GenericInput {}

  
  export class Error {
    constructor(errors: object)
  }

  export interface ValidatorProviderProps {
    validator: Function
  }

  export interface LayoutProviderProps {
    layout: React.Component | Function
  }

  export class Form extends React.Component<FormProps> {}
  export class LayoutProvider extends React.Component<LayoutProviderProps> {}
  export class ValidatorProvider extends React.Component<ValidatorProviderProps> {}

  export interface FieldProps {
    layout?: React.Component | Function | null | false
    nested?: boolean
    array?: boolean
  }

  export type Decorator = (original: React.ComponentType<any>) => React.ComponentType<InputProps>;

  export type FieldDecorator<Props> = <T extends React.ComponentType<Props>>(original: T) => React.ComponentType<InputProps & Props>;

  export interface Field {
    (props?: FieldProps): FieldDecorator<{}>
    <Props>(props?: FieldProps): FieldDecorator<Props>
  }

  export const field: Field;

  // tslint:disable-next-line
  export interface config {}
  export function optionizer(): Decorator;
  export function trimmer(): Decorator;
}
