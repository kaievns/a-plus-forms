declare module 'a-plus-forms' {
  export type FormProps = {
    value?: any,
    defaultValue?: any,
    onChange?: Function,
    schema?: any | Function,
    className?: string,
    onSubmit?: Function,
    onError?: Function,
    children: React.ReactChildren | React.ReactChild | JSX.Element | JSX.Element[]
  }

  export type InputProps = {
    id?: string,
    name?: string,
    help?: string,
    label?: string,
    value?: any,
    defaultValue?: any,
    className?: string,
    placeholder?: string,
    disabled?: boolean,
    required?: boolean,
    onChange?: Function,
    layout?: React.Component | Function | null | false
  }

  export type LayoutProps = {
    input: InputProps,
    label?: string,
    error?: string
  }

  export type Options = any[] | object;
  export type OptionsProps = { options?: Options };

  export class Layout extends React.PureComponent<LayoutProps> { }

  export class Checkbox extends React.Component<InputProps> { }
  export class EmailInput extends React.Component<InputProps> { }
  export class HiddenInput extends React.Component<InputProps> { }
  export class NumberInput extends React.Component<InputProps> { }
  export class PasswordInput extends React.Component<InputProps> { }
  export class PhoneInput extends React.Component<InputProps> { }
  export class SearchInput extends React.Component<InputProps> { }

  export class Radios extends React.Component<InputProps & OptionsProps> { }
  export class Select extends React.Component<InputProps & OptionsProps & {
    multiple?: boolean
    clearable?: boolean
  }> { }
  export class Slider extends React.Component<InputProps> { }
  export class TextInput extends React.Component<InputProps & {
    type?: 'text' | 'password' | 'email' | 'number'
  }> { }
  export class Textarea extends React.Component<InputProps> { }


  export class Error {
    constructor(errors: any)
  }

  export type ValidatorProviderProps = {
    validator: Function
  }

  export type LayoutProviderProps = {
    layout: React.Component | Function
  }

  export class Form extends React.Component<FormProps> {
    submit(): void
    reset(): void
  }
  export class LayoutProvider extends React.Component<LayoutProviderProps> { }
  export class ValidatorProvider extends React.Component<ValidatorProviderProps> { }

  export type FieldOptions = {
    layout?: React.Component | Function | null | false,
    nested?: boolean,
    array?: boolean
  }

  export type FieldDecorator<Props> = <T extends React.ComponentType<Props>>(original: T) => React.ComponentType<InputProps & Props>;
  export type OptionsDecorator<Props> = <T extends React.ComponentType<Props>>(original: T) => React.ComponentType<OptionsProps & Props>;
  export type TrimmerDecorator<Props> = <T extends React.ComponentType<Props>>(original: T) => React.ComponentType<Props>;

  export interface Field {
    (options?: FieldOptions): FieldDecorator<{}>
    <Props>(options?: FieldOptions): FieldDecorator<Props>
  }

  export interface Optionizer {
    (): OptionsDecorator<{}>
    <Props>(): OptionsDecorator<Props>
  }

  export interface Trimmer {
    (): TrimmerDecorator<{}>
    <Props>(): TrimmerDecorator<Props>
  }

  export const field: Field;
  export const optionizer: Optionizer;
  export const trimmer: Trimmer;

  // tslint:disable-next-line
  export const config: any;
}
