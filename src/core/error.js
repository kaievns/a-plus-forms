/* @flow */
import type { Element } from '../types';

type Errors = Object | string;
type Field = Element & {
  context: {
    APFError?: Object,
    APFState?: Object
  },
  stateManager: {
    getValue: Function
  }
};

export default class ValidationError extends Error {
  errors: Errors;

  constructor(errors: Errors) {
    super(JSON.stringify(errors));
    this.errors = errors;
  }
}

export const extractErrorsFor = (field: Field): ?string => {
  const { fieldOptions: options } = field.constructor;
  const error = findCurrentError(field);

  if (error != null && typeof error !== 'string') { // eslint-disable-line
    let nestedErrors = error;

    if (options.nested || options.array) {
      nestedErrors = { ...error };
      const currentValue = field.stateManager.getValue();

      // filter out the existing nested fields
      const names = options.nested
        ? Object.keys(currentValue || {})
        : (currentValue || []).map((_, index) => index.toString());

      for (let i = 0; i < names.length; i++) {
        delete nestedErrors[names[i]];
      }
    }

    return nestedErrorToString(nestedErrors);
  }

  return error;
};

function findCurrentError(field: Field): string | Object | void {
  const { APFError = {}, APFState } = field.context;
  const { error: propsError, name } = field.props;

  if (APFState && APFState.isArray) {
    const index = APFState.getIndexFor(field);
    return APFError[index.toString()];
  }

  return propsError == null ? APFError[name] : propsError; // eslint-disable-line
}

function nestedErrorToString(errors: Object): string {
  const messages = Object.keys(errors).map(key => {
    let error = errors[key];

    if (error && typeof error !== 'string') {
      error = nestedErrorToString(error);
    }

    return `${key} ${error}`.trim();
  });

  return humanizeMessages(messages);
}

function humanizeMessages(list: Array<string>): string {
  const lastMessage = list.pop();

  if (list.length > 0) {
    return `${list.join(', ')}, and ${lastMessage}`;
  }

  return lastMessage;
}
