export type FormProps = {
  onSubmit?: Function,
  defaultValue?: ?Object,
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
  target : {
    value: string
  }
};

export type SelectOption = {
  label: string,
  value: string,
  disabled?: boolean
};
