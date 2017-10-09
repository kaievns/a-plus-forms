/* @flow */
/**
 * So, the select options come in all sorts of shapes and sizes
 * and the role of this module is to normalize all this madness
 * and turn it into simplified `value -> label` list for the actual
 * inputs to consume
 *
 * Supported options:
 *   1. Array<{ label: string, value: any }>
 *   2. { [string(value)]: string (label) }
 *   3. Array<{ name: string, ....}>
 *   4. Array<string>
 *   5. Array<number>
 *   6. Array<any> (JSON.stringified to create a label)
 *
 * NOTE: in cases 3, 4, 5, 6 the individual entries of the arrays
 *       are treated as the actual values that will be sent in the
 *       `onChange` handler
 *
 * NOTE: if the input receives the `multiple` prop, then this input
 *       will assume values as lists
 *
 * NOTE: in case of a `multiple` select, if no items is selected,
 *       then the `onChange` event will receive *an empty list* as the value
 */
import React from 'react';
import type { InputProps, SelectOption, Component } from '../types';

type LabelValueOption = SelectOption;
type NamedOption = { name: string, disabled?: boolean };
type StringOption = string;
type NumberOption = number;

type AnyOption = LabelValueOption | NamedOption | StringOption | NumberOption;

type KeyValueOptions = { [string]: string };
type SupportedOptions = Array<AnyOption> | KeyValueOptions;

type PseudoValue = string | Array<string> | null;

type OptionizedProps = InputProps & {
  value?: any,
  options: SupportedOptions,
  multiple?: boolean
};

type StateProps = {
  options: Array<LabelValueOption>
};

export default () => (Input: Component) =>
  class Optionizer extends React.Component<OptionizedProps, StateProps> {
    state = { options: [] };
    originalOptions: SupportedOptions = [];

    componentWillMount() {
      this.componentWillReceiveProps(this.props);
    }

    componentWillReceiveProps(props: OptionizedProps) {
      if (props.options !== this.originalOptions) {
        this.setState({ options: this.buildPseudoOptions(props) });
        this.originalOptions = props.options;
      }
    }

    buildPseudoOptions(props: OptionizedProps): Array<LabelValueOption> {
      return this.normalizedOptions(props).map((option, index) => {
        if (
          typeof option === 'object' &&
          typeof option.label === 'string' &&
          typeof option.value === 'string'
        ) {
          return { label: option.label, value: option.value, disabled: option.disabled };
        } else if (typeof option === 'object' && typeof option.name === 'string') {
          return { label: option.name, value: `v-${index}`, disabled: option.disabled };
        } else if (typeof option === 'string') {
          return { label: option, value: option };
        }

        return { label: JSON.stringify(option).substr(0, 32), value: `v-${index}` };
      });
    }

    normalizedOptions(props?: OptionizedProps): Array<AnyOption> {
      const { options: originalOptions = [] } = props || this.props;

      return Array.isArray(originalOptions)
        ? originalOptions
        : Object.keys(originalOptions).map(value => ({ value, label: originalOptions[value] }));
    }

    pseudoToOriginalValue(value: PseudoValue): any {
      const options = this.normalizedOptions();
      const option = this.state.options.reduce(
        (current, option, index) => (option.value === value ? options[index] : current),
        null
      );

      return option && option.label && option.value !== undefined ? option.value : option;
    }

    originalToPseudoValue(value: any): PseudoValue {
      const options = this.normalizedOptions();

      const currentOption = options.find(
        option => (option.label && option.value === value) || option === value
      );
      const currentIndex = currentOption ? options.indexOf(currentOption) : -1;
      const pseudoEntry = this.state.options[currentIndex];
      const pseudoValue = pseudoEntry && pseudoEntry.value;

      return pseudoValue;
    }

    onChange = (value: PseudoValue) => {
      const { onChange, multiple } = this.props;

      if (multiple) {
        onChange(
          (Array.isArray(value) ? value : []).map(value => this.pseudoToOriginalValue(value))
        );
      } else {
        onChange(this.pseudoToOriginalValue(value));
      }
    };

    render() {
      const { value, multiple } = this.props;
      const pseudoValue = multiple
        ? (Array.isArray(value) ? value : []).map(value => this.originalToPseudoValue(value))
        : this.originalToPseudoValue(value);

      return (
        <Input
          {...this.props}
          value={pseudoValue}
          options={this.state.options}
          onChange={this.onChange}
        />
      );
    }
  };
