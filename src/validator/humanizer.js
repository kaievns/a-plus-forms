/* @flow */

/**
 * Converts Ajv errors into human friendly errors hash
 */
export default (errors: Array<Object>): Object =>
  errors.reduce((errors, error) => {
    const { dataPath, message, keyword, params: { missingProperty, type } } = error;
    const path = keyword === 'required' ? `${dataPath}.${missingProperty}` : dataPath;
    const text = humanReadable(keyword, message, dataPath, missingProperty, type);

    return { ...errors, [path.replace(/^\./, '')]: text };
  }, {});

function getNumFromStr(str) {
  return `${str.match(/\d+/)[0]}`;
}

function comparisonToStr(message) {
  return message
    .replace(' >= ', ' greater than or equal to ')
    .replace(' <= ', ' less than or equal to ')
    .replace(' > ', ' greater than ')
    .replace(' < ', ' less than ');
}

/**
 * Converts an individual Ajv error into a human readable message
 */
function humanReadable(keyword, message, path, missingProperty, type) {
  switch (keyword) {
    case 'required':
      return 'is required';
    case 'pattern':
      return /phone/.test(path) ? 'must be a valid phone number' : 'must match the pattern';
    case 'format':
      return `must be a valid ${message.match(/"(.+?)"/)[1]}`;
    case 'type':
      return `must be a ${type}`;
    case 'enum':
      return 'is not on the list';
    case 'minLength': {
      const length = getNumFromStr(message);
      return `must be at least ${length} character${length === 1 ? '' : 's'} long`;
    }
    case 'maxLength': {
      const length = getNumFromStr(message);
      return `must be less than ${length} character${length === 1 ? '' : 's'} long`;
    }
    case 'minItems': {
      const length = getNumFromStr(message);
      return `must have at least ${length} item${length === 1 ? '' : 's'}`;
    }
    case 'maxItems': {
      const length = getNumFromStr(message);
      return `must have less than ${length} item${length === 1 ? '' : 's'}`;
    }
    case 'maximum':
    case 'minimum':
    default:
      return comparisonToStr(message.replace('should', 'must'));
  }
}
