/* @flow */
import React from 'react';
import type { InputProps, SelectOption } from '../types';

type LabelValueOption = {
  label: string,
  value: string
};

type NamedOption = {
  name: string
};

type StringOption = string;
type NumberOption = number;

type AnyOption = LabelValueOption | NamedOption | StringOption | NumberOption;

export default () =>
  (Input: Object) =>
    class Optionizer extends React.Component {
      onChange = (pseudoValue: string) => {
        const { options = [], onChange } = this.props;
        const option = this.convertedOptions().reduce((current, option, index) =>
          option.value === pseudoValue ? options[index] : current
        , null);

        if (option.label && option.value !== undefined) {
          onChange(option.value);
        } else {
          onChange(option);
        }
      }

      convertedOptions(): Array<SelectOption> {
        const { options = [] } = this.props;

        return options.map((option, index) => {
          if (typeof option === 'string') {
            return { label: option, value: option };
          } else if (option.label && option.value !== undefined) {
            return option;
          } else if (option.name) {
            return { label: option.name, value: `v-${index}`, disabled: option.disabled };
          }

          return { label: `${option}`, value: `v-${index}` };
        });
      }

      options = []

      props: InputProps & {
        value?: any,
        options: Array<AnyOption>
      }

      render() {
        const { value, options = [], ...rest } = this.props;
        const currentOption = options.reduce((current, option) =>
          option === value || (option && option.value === value) ? option : current
        , null);
        const currentIndex = options.indexOf(currentOption);
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
