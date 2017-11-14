/* @flow */
import type { FieldOptions, Element } from '../types';

type Errors = Object | string;

export default class ValidationError extends Error {
  errors: Errors;

  constructor(errors: Errors) {
    super(JSON.stringify(errors));
    this.errors = errors;
  }
}

type FieldElement = {
  context: { APFError?: Object },
  stateManager: {
    getValue: Function
  }
};

export const extractErrorsFor = (field: Element & FieldElement, options: FieldOptions): ?string => {
  const { APFError = {} } = field.context;
  const { error: propsError, name } = field.props;
  const error = propsError == null ? APFError[name] : propsError; // eslint-disable-line

  if (error != null && typeof error !== 'string') { // eslint-disable-line
    let nestedErrors = error;

    if (options.nested) {
      nestedErrors = { ...error };

      // filter out the existing nested fields
      const names = Object.keys(field.stateManager.getValue() || {});

      for (let i = 0; i < names.length; i++) {
        delete nestedErrors[names[i]];
      }
    }

    return nestedErrorToString(nestedErrors);
  }

  return error;
};

function nestedErrorToString(errors: Object): string {
  const messages = [];
  const keys = Object.keys(errors);

  for (let i = 0; i < keys.length; i++) {
    let error = errors[keys[i]];

    if (error && typeof error !== 'string') {
      error = nestedErrorToString(error);
    }

    messages.push(`${keys[i]} ${error}`.trim());
  }

  return humanizeMessages(messages);
}

function humanizeMessages(list: Array<string>): string {
  const lastMessage = list.pop();

  if (list.length > 0) {
    return `${list.join(', ')}, and ${lastMessage}`;
  }

  return lastMessage;
}
