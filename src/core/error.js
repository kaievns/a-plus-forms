/* @flow */
import { isValidElement } from 'react';
import type { Element } from '../types';

type Errors = Object | string;
type Field = Element & {
  context: Object,
  stateManager: {
    getValue: Function
  }
};

/**
 * A dedicated exception for third party code to trigger
 * validation errors in the `Form`
 */
export default class ValidationError extends Error {
  errors: Errors;

  constructor(errors: Errors) {
    super(JSON.stringify(errors));
    this.errors = errors;
  }
}

/**
 * Handles all the nested errors redirection madness
 */
export class ErrorsManager {
  element: Field;

  constructor(element: Field) {
    this.element = element;
  }

  getCurrentError(): ?Errors {
    const { APFError = {}, APFState } = this.element.context;
    const { error: propsError, name } = this.element.props;

    if (APFState && APFState.isArray) {
      const index = APFState.getIndexFor(this.element);
      return APFError[index.toString()];
    }

    return propsError == null ? APFError[name] : propsError; // eslint-disable-line
  }

  getErrorMessage(): ?string | Error {
    const { fieldOptions: options } = this.element.constructor;
    const error = this.getCurrentError();

    if (isValidElement(error)) return error;

    if (error != null && typeof error !== 'string') { // eslint-disable-line
      let nestedErrors = error;

      if (options.nested || options.array) {
        nestedErrors = { ...error };
        const currentValue = this.element.stateManager.getValue();

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
  }
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
