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
  value?: string,
  onChange: Function
};

export type InputEvent = {
  target : {
    value: string
  }
};

export type SelectOption = {
  label: string,
  value: any,
  disabled?: boolean
};