/* @flow */
import React from 'react';
import type { InputProps, SelectOption, Component } from '../types';

type LabelValueOption = SelectOption;

type NamedOption = {
  name: string,
  disabled?: boolean
};

type StringOption = string;
type NumberOption = number;

type AnyOption = LabelValueOption | NamedOption | StringOption | NumberOption;

type KeyValueOptions = Object;

export default () =>
  (Input: Component) =>
    class Optionizer extends React.Component {
      onChange = (pseudoValue: string) => {
        const { onChange } = this.props;
        const options = this.normalizedOptions();
        const option = this.convertedOptions().reduce((current, option, index) =>
          option.value === pseudoValue ? options[index] : current
        , null);

        if (option && option.label && option.value !== undefined) {
          onChange(option.value);
        } else {
          onChange(option);
        }
      }

      normalizedOptions(): Array<AnyOption> {
        const { options = [] } = this.props;

        if (!Array.isArray(options)) {
          return Object.keys(options).map(value => ({ value, label: options[value] }));
        }

        return options;
      }

      convertedOptions(): Array<SelectOption> {
        return this.normalizedOptions().map((option, index) => {
          if (typeof option === 'object' && typeof option.label === 'string' && typeof option.value === 'string') {
            return { label: option.label, value: option.value, disabled: option.disabled };
          } else if (typeof option === 'object' && typeof option.name === 'string') {
            return { label: option.name, value: `v-${index}`, disabled: option.disabled };
          } else if (typeof option === 'string') {
            return { label: option, value: option };
          }

          return { label: JSON.stringify(option), value: `v-${index}` };
        });
      }

      options = []

      props: InputProps & {
        value?: any,
        options: Array<AnyOption> | KeyValueOptions
      }

      render() {
        const { value, ...rest } = this.props;
        const options = this.normalizedOptions();

        const currentOption = options.find(option =>
          (option.label && option.value === value) || option === value
        );
        const currentIndex = currentOption ? options.indexOf(currentOption) : -1;
        const pseudoOptions = this.convertedOptions();
        const pseudoEntry = pseudoOptions[currentIndex];
        const pseudoValue = pseudoEntry && pseudoEntry.value;

        return (
          <Input
            {...rest}
            value={pseudoValue}
            onChange={this.onChange}
            options={pseudoOptions}
          />
        );
      }
    };
