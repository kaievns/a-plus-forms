/* @flow */
import type { FieldOptions, Element, Valuable } from '../types';

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
    strategy: {
      fields?: Array<Valuable>
    }
  }
};

export const extractErrorsFor = (field: Element & FieldElement, options: FieldOptions): ?string => {
  const { APFError = {} } = field.context;
  const { error: propsError, name } = field.props;
  const error = propsError || APFError[name];

  if (error && typeof error !== 'string') {
    // nested errors
    let nestedErrors = error;

    if (options.nested) {
      nestedErrors = { ...error };

      // filter out the existing nested fields
      const { fields = [] } = field.stateManager.strategy;

      for (let i = 0; i < fields.length; i++) {
        const { name } = fields[i];
        if (name) delete nestedErrors[name];
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
